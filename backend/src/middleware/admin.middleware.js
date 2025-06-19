

export const isAdmin = async (req,res,next) => {
    const role = req.user?.role || "user";
    if (role !== "admin"){
        return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
}