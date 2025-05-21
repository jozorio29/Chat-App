# MERN Chat App 💬

A real-time chat application built with the **MERN** stack (MongoDB, Express, React, Node.js). Includes user authentication, group messaging, and real-time updates via Socket.IO.

## ✨ Features

- 🔐 JWT-based authentication with secure cookies
- 💬 One-to-one and group messaging
- 📡 Real-time updates with Socket.IO
- 📥 File and image attachments (optional)
- 🧑‍💼 Admin panel (if applicable)
- 🌐 Responsive UI with Material UI

## 🛠️ Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Frontend    | React, Material UI   |
| Backend     | Node.js, Express     |
| Database    | MongoDB              |
| Real-Time   | Socket.IO            |
| Auth        | JWT, Cookies         |
| Deployment  | Vercel / Render      |

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/jozorio29/Chat-App.git
cd Chat-App
```

### Install Dependencies
```
cd client
npm install

cd ../server
npm install
```

### Configure Environment Variables
Create a .env file inside the server/ folder:
```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```
###  Run the Application
Start the frontend:
```
cd client
npm run dev
```
Start the backend:
```
cd server
npm run dev
```