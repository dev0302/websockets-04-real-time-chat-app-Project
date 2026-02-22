# WebSockets – Real-Time Chat Application 💬

## 📌 Overview
This project is a **real-time chat application built using pure WebSockets** (without Express or Socket.IO).  
It supports **multiple chat rooms**, where users can join a specific room and exchange messages **only with users in the same room**.

The goal of this project is to understand **how real-time chat systems work internally**, including socket management, room-based messaging, and persistent connections.

---

## ✨ Features
- Pure WebSocket server (no Express)
- Real-time, bidirectional communication
- Multiple chat rooms support
- Room-based message isolation
- Dynamic user join & disconnect handling
- React frontend with live message updates
- Clean client–server message protocol using JSON

---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **WebSocket (`ws`)**
- **TypeScript**

### Frontend
- **React**
- **TypeScript**
- **React Router**
- **Tailwind CSS**
- **Browser WebSocket API**

---

## 🧠 What I Learned
- How real-time chat applications work internally
- Managing **multiple sockets with metadata (room-based users)**
- Designing a simple **WebSocket message protocol**
- Handling:
  - User join events
  - Room-based message broadcasting
  - Socket disconnections
- Difference between **broadcasting to all users** vs **broadcasting to a room**
- Integrating WebSockets cleanly with a React frontend

---

## ⚙️ How It Works

### 🔹 Message Protocol
All client–server communication happens using JSON messages.

#### Join Room
```json
{
  "type": "join",
  "payload": {
    "roomId": "red"
  }
}

```
---

🔹 Backend Flow

WebSocket server starts on port 8080

When a client connects:

The socket is stored along with its room info

On join message:

User is assigned to a specific room

On chat message:

Server finds the sender’s room

Message is sent only to users in that room

On disconnect:

Socket is removed from memory

🔹 Frontend Flow

User selects or navigates to a room URL

WebSocket connection is established

Client sends a join event on connection

Messages are sent via WebSocket

Incoming messages are rendered instantly in the UI

🚀 How to Run the Project
1️⃣ Start Backend
cd server
npm install
npm run dev

Server runs on:

ws://localhost:8080
2️⃣ Start Frontend
cd ws_frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🧪 How to Use

Open the homepage:

http://localhost:5173

Join a room:

http://localhost:5173/room/red

Open the same room in another browser/tab

Start chatting in real time 🎉

📂 Project Structure
websockets-04-chatApplication-Project/
│
├── server/
│   └── index.ts        # WebSocket server with room logic
│
├── ws_frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── Chat.tsx
│   │   └── Home.tsx
│
└── README.md
🔍 Key Concepts Covered

Persistent WebSocket connections

Room-based message routing

Socket lifecycle management

Real-time UI updates

Custom WebSocket event design

🚀 Future Improvements

Add usernames for users

Show join/leave notifications

Persist messages using a database

Add authentication

Improve UI with chat bubbles & timestamps

Deploy backend + frontend

📚 Ideal For

Learning real-time system design

Understanding WebSocket internals

Building chat applications

Preparing for backend & full-stack interviews

