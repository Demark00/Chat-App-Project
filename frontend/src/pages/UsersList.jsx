import React from 'react'
import { useAdminStore } from '../store/useAdminStore'
import { useEffect } from 'react'
import { Trash2 } from 'lucide-react'

const UsersList = () => {
  const {users, isLoadingUsers, fetchUsers, deleteUser} = useAdminStore()

  useEffect(()=>{
    fetchUsers()
  }, [])

  console.log(users)

  const handleDelete = async (userId) => {
    await deleteUser(userId);
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
    <h1 className="text-4xl font-bold mb-8 text-center text-primary mt-10">Users List</h1>
    <div className="space-y-6">
      {users.map((user) => (
        <div
          key={user._id}
          className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <figure className="p-4">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-20 h-20 rounded-full border-4 border-primary object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                {user.fullName[0]}
              </div>
            )}
          </figure>
          <div className="card-body flex-1">
            <h2 className="card-title text-2xl">{user.fullName}</h2>
            <p className="text-base-content/70">{user.email}</p>
            <div className="flex gap-4 items-center mt-2">
              <span className={`badge badge-${user.role === "admin" ? "secondary" : "info"} badge-lg`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <span className="text-xs text-base-content/50">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center pr-6">
            <button
              className="btn btn-circle btn-error btn-outline hover:scale-110 transition-transform"
              onClick={() => handleDelete(user._id)}
              title="Delete User"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default UsersList