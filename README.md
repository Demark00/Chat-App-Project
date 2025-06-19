# 💬 Chat App with Role-Based Admin Access

A full-stack real-time chat application with JWT-based authentication and role-based authorization (admin & user). Built using **React**, **Express**, **MongoDB**, and **Cloudinary**.

> 👑 Admins can view and manage all users from a dedicated dashboard.  
> 💬 Users can chat, share images, and see who’s online in real time.

---

## 🚀 Features

### 👤 Authentication
- Register and login securely using JWT
- Passwords are hashed and stored safely
- HTTP-only cookies for secure session management

### 🔐 Role-Based Authorization
- Supports `user` and `admin` roles
- Admins have access to protected routes and tools
- Role-based navigation and frontend visibility

---

## 💬 Chat Functionality

The app includes a fully functional **real-time chat system**, where users can:

- ✉️ Send and receive messages instantly
- 🖼️ Share images in chat (uploaded to Cloudinary)
- 🧑‍🎨 Update their profile picture
- 🟢 Filter and view currently online users
- 💬 Engage in 1-on-1 conversations with other registered users

Chat updates happen in real time using modern frontend state and effect handling.

---

## 🛠️ Admin Features

- 👥 View a list of all registered users
- 🗑️ Delete any user from the platform permanently
- 🔐 Admin routes are protected on both frontend and backend
- 📁 Admin-only "Users" tab visible in navbar

---

## 🧪 Demo Credentials

You can use the following demo accounts to test the app:

### 👑 Admin Account
Email: admin@gmail.com
Password: admin123

# Regular Account
// You can create a dummy account to test application.


---

## 🖥️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + Cookies
- **Media Uploads:** Cloudinary
---

## 🛠️ Installation & Running Locally

1. **Clone the repo**
```bash
git clone https://github.com/Demark00/Chat-App-Project.git
cd Chat-App-Project

# For backend
cd backend
npm install

# For backend
cd frontend
npm install

# Create .env file - Setup environment variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

**Start App**
# For Backend
npm run dev

# For Frontend
npm run dev






 




