// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/page/${roomId}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <button
        onClick={createRoom}
        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Create Drawing Room
      </button>
    </div>
  );
};

export default Home;
