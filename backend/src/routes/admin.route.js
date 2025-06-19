import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { getAllUsers } from "../controllers/admin.controller.js";
import { deleteUser } from "../controllers/admin.controller.js";

const router = express.Router()

// GET: List of all users
router.get('/users', protectRoute, isAdmin, getAllUsers)


// DELETE: Delete a user 
router.delete('/users/:id', protectRoute, isAdmin, deleteUser)

export default router;