# 🎨 DoodleUp

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**DoodleUp** is a sleek, real-time collaborative drawing application. Bring your ideas to life anywhere, instantly sharing a canvas with others online.

## ✨ Features
- **Real-Time Synchronization**: Instantly see what others are drawing
- **No Sign-Up Required**: Create a room, share the link, and start drawing
- **Premium Interface**: Aesthetic glassmorphism UI with smooth animations
- **Rich Toolkit**: Pen, brush, highlighter, and scalable custom eraser tools
- **Advanced Controls**: Dynamic stroke size adjustments and custom color picker
- **Action Notifications**: Activity alerts when users join or canvases are cleared
- **Export Capabilities**: Download the shared canvas as a high-quality PNG
- **Cost-Optimized Backend**: Mongoose schema specifically crafted without repetitive generic identifiers to save huge amounts of MongoDB Atlas costs on drawn strokes.

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Socket.io
- **Real-time Communication**: WebSockets

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/SK1965/DoodleUp.git
   ```
2. **Install frontend dependencies**
   ```bash
   cd client && npm install
   ```
3. **Install backend dependencies**
   ```bash
   cd server && npm install
   ```
4. **Start the servers**
   - In the `client` directory: `npm run dev`
   - In the `server` directory: `npm run dev` (or `node src/app.js`)
   
5. **Draw away!**
   Open your browser to the local standard Vite port (e.g., `localhost:5173`) and create a room.
