import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        fullName: {
            type:String,
            required:true,
        },
        password: {
            type:String,
            required:true,
            minLength:6,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        profilePic: {
            type: String,
            default: "",
        }
    },
    {timestamps: true}
)

const User = mongoose.model("User", userSchema)

export default User