import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req,res)=>{
    const {email, fullName, password} = req.body;
    try{
        
        // Check if credentials are not provided
        if (!fullName || !email || !password){
            return res.status(400).json({message: "All Fields are required"})
        }

        // Check if password length is less than 6
        if (password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }

        // Check if user already exists
        const user = await User.findOne({email})
        if (user){
            return res.status(400).json({message: "Email already exists"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new User
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        if (newUser){
            // generate jwt token here
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        } else{
            res.status(400).json({message: "Invalid User Data"})
        }
    }catch(err){
        console.log(`Error in signup controller ${err.message}`)
        res.status(500).json({message: "Internal server error"})
    }
}

export const login = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"}); 
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })

    }catch(err){
        console.log(`Error in login controller ${err.message}`)
        res.status(500).json({message: "Internal server error"})
    }
}

export const logout = (req,res)=>{
    try{
        res.cookie("jwt", "",{ maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    }catch(err){
        console.log(`Error with logout controller ${err.message}`);
        res.status(500).json({message: "Internal server ERror"})
    }
}

export const updateProfile = async (req,res)=>{
    try{
        console.log("Update profile request received");
        console.log("Request body size:", JSON.stringify(req.body).length); // Log body size

        const {profilePic} = req.body;

        console.log("Base64 string length:", profilePic.length); // Log base64 length

        if (!profilePic){
            return res.status(400).json({message: "Profile Pic is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        if (!uploadResponse || !uploadResponse.secure_url) {
            return res.status(500).json({ message: "Cloudinary upload failed" });
        }
        
        // Access userId from req.user
        const userId = req.user._id; 
        
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new:true}) 

        res.status(200).json(updatedUser)
    }catch(err){
        console.log(`Error in update profile: ${err.message}`);
        res.status(400).json({message: "Internal server Error"});
    }
}

export const checkAuth = (req, res)=>{
    try{
        console.log("req.user in checkAuth:", req.user); // Crucial log
        res.status(200).json(req.user);
    }catch(err){
        console.log(`Error with checkAuth controller: ${err.message}`);
        res.status(400).json({message: "Internal server error"});
    }
}