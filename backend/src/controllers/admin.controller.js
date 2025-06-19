import User from "../models/user.model.js";

export const getAllUsers =  async (req, res)=>{
    try{
        const users = await User.find({}).select("-password");
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: "Error fetching Users", error: error})
    }
}

export const deleteUser =  async (req, res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    }catch(error){
        res.status(500).json({ message: "Error deleting user", error: error });
    }
}