import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";
// Controller function to get users for the sidebar, excluding the logged-in user
export const getUsersForSidebar = async (req, res) => {
    try {
        // Get the logged-in user ID from the request object
        const loggedInUser = req.user.user_id;

        // Find all users except the logged-in user and exclude the password field
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        // Send the filtered users in the response with a status code of 200
        res.status(200).json(filteredUsers);
    } catch (err) {
        // Log any errors that occur and send a 500 status code with an error message
        console.log(`Error in getUsersForSidebar: ${err.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const myId = req.user._id;
  
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
};

export const sendMessage = async(req, res)=>{
    try{
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user;

        let imageUrl;
        if(image){
            // Upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        // todo: realtime functionality goes here => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage);

    }catch(err) {
        console.log(`Error in sendMessage controller: ${err.message}`);
        res.status(400).json({message: "Internal server error"});
    }
}

