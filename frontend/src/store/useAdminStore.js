import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set, get) => ({
    users:[],
    isLoadingUsers: false,

    fetchUsers: async ()=>{
        try{
            const req = await axiosInstance.get('/admin/users');
            set({users: req.data})
            toast.success("Users fetched successfully")
        }catch(error){
            toast.error("Error in fetching users")
        }
    },

    deleteUser: async (id)=>{
        try{
            const req = await axiosInstance.delete(`/admin/users/${id}`);
            get().fetchUsers(); 
            toast.success("User Deleted Successfully")
        }catch(error){
            toast.error('User Deletion failed')
        }
    }
}));