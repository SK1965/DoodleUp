import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/page/${roomId}`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 pb-2">
            DoodleUp
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light">
            Real-time collaborative drawing.<br />Create a room and share your ideas live.
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl transition-all hover:bg-white/10">
          <button
            onClick={createRoom}
            className="w-full relative inline-flex items-center justify-center font-semibold px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] transform"
          >
            <span className="mr-2">Start Drawing Workshop</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <p className="mt-6 text-sm text-gray-400">
            No signup required. Instant access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
