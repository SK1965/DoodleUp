import { useEffect, useRef, useState } from "react";
import socket from "../socket";

interface CanvasProps {
  roomId: string;
}

interface DrawData {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  color: string;
  size: number;
}

const Canvas: React.FC<CanvasProps> = ({ roomId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(2);
  const prev = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctxRef.current = ctx;
    }
  }, []);

  const drawLine = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string,
    size: number,
    emit: boolean = true
  ) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();

    if (emit) {
      const msg = socket.emit("drawing", {
        roomId,
        data: { x0, y0, x1, y1, color, size },
      });
      console.log(msg)
    }
  };

  const getMousePos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    let clientX = 0, clientY = 0;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return { x: clientX, y: clientY };
  };

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    setDrawing(true);
    const { x, y } = getMousePos(e);
    prev.current = { x, y };
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!drawing) return;
    const { x, y } = getMousePos(e);
    const prevPos = prev.current;
    if (prevPos) {
      drawLine(prevPos.x, prevPos.y, x, y, color, size, true);
      prev.current = { x, y };
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
    prev.current = null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", handleMouseDown as EventListener);
    canvas.addEventListener("mousemove", handleMouseMove as EventListener);
    window.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleMouseDown as EventListener);
    canvas.addEventListener("touchmove", handleMouseMove as EventListener);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown as EventListener);
      canvas.removeEventListener("mousemove", handleMouseMove as EventListener);
      window.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleMouseDown as EventListener);
      canvas.removeEventListener("touchmove", handleMouseMove as EventListener);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [drawing, color, size]);

  useEffect(() => {
    const handleDrawing = async ({ data }: { data: DrawData }) => {
      drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.size, false);
    };

    const handleDrawingHistory = async (strokes: DrawData[]) => {
      for (const s of strokes) {
        drawLine(s.x0, s.y0, s.x1, s.y1, s.color, s.size, false);
      }
    };

    socket.on("drawing", handleDrawing);
    socket.on("drawing-history", handleDrawingHistory);

    return () => {
      socket.off("drawing", handleDrawing);
      socket.off("drawing-history", handleDrawingHistory);
    };
  }, []);

  return (
    <div>
      <div className="absolute top-4 left-4 z-10 flex items-center gap-4 bg-white p-2 rounded-md shadow-md">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <input
          type="range"
          min={1}
          max={20}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>
      <canvas ref={canvasRef} className="w-screen h-screen touch-none" />
    </div>
  );
};

export default Canvas;
