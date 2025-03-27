// auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // console.log("protectRoute: Token from cookies:", token);

        if (!token) {
            // console.log("protectRoute: No token found");
            return res.status(400).json({ message: "Unauthorized - No Token provided" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("protectRoute: Decoded token:", decoded);

            const user = await User.findById(decoded.userId).select("-password");
            // console.log("protectRoute: User from DB:", user);

            if (!user) {
                console.log("protectRoute: User not found in DB");
                return res.status(400).json({ message: "User not found" });
            }

            req.user = user;
            // console.log("protectRoute: req.user set:", req.user);
            next();
        } catch (jwtErr) {
            console.log("protectRoute: JWT verification error:", jwtErr);
            return res.status(400).json({ message: "Unauthorized - Invalid token" });
        }

    } catch (err) {
        console.log(`Error in protectRoute middleware ${err.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};