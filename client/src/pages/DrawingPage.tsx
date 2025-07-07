import { useParams } from "react-router-dom";
import { useEffect } from "react";
import socket from "../socket";
import Canvas from "../components/Canvas";

const DrawingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
 console.log
  useEffect(() => {
    const joinRoom = async () => {
      if (id) {
        await socket.emit("join-room", { roomId: id });
      }
    };
    joinRoom();
  }, [id]);

  return (
    <div className="h-screen bg-white">
      {id && <Canvas roomId={id} />}
    </div>
  );
};

export default DrawingPage;
