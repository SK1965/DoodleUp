import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import type { CanvasProps, DrawData, Tool } from "../types/types";
import { BG_COLOR, drawLine } from "../utils/drawUtils";
import Toolbar from "./Toolbar";
import Toast from "./Toast";

const Canvas: React.FC<CanvasProps> = ({ roomId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [cursorStyle, setCursorStyle] = useState("crosshair");
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>("pen");
  const [penSize, setPenSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(20);
  const [strokeColor, setStrokeColor] = useState("#222222");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
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
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctxRef.current = ctx;
    }
  }, []);

  useEffect(() => {
    if (tool === "eraser") {
      const size = Math.max(20, eraserSize); // Set min visual size for eraser cursor
      const svg = `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="10" width="12" height="6" rx="2" transform="rotate(-45 3 10)" fill="#ffb6c1" stroke="#333" stroke-width="1.5"/>
        <rect x="12" y="15" width="6" height="2.2" rx="1" transform="rotate(-45 12 15)" fill="#eee" />
      </svg>`;
      const cursor = `url('data:image/svg+xml;base64,${window.btoa(svg)}') 0 ${size}, auto`;
      setCursorStyle(cursor);
    } else {
      setCursorStyle("crosshair");
    }
  }, [tool, eraserSize]);

  const getPointer = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    let x = 0, y = 0;
    if (e instanceof MouseEvent) {
      x = e.clientX;
      y = e.clientY;
    } else if (e.touches.length > 0) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }
    return { x, y };
  };

  const handleStart = (e: MouseEvent | TouchEvent) => {
    setDrawing(true);
    const { x, y } = getPointer(e);
    prev.current = { x, y };
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!drawing) return;
    const { x, y } = getPointer(e);
    const prevPos = prev.current;
    if (prevPos && ctxRef.current) {
      const mode = tool;
      const size = tool === "eraser" ? eraserSize : penSize;
      const color = strokeColor;
      const data: DrawData = {
        x0: prevPos.x,
        y0: prevPos.y,
        x1: x,
        y1: y,
        color: tool === "eraser" ? BG_COLOR : strokeColor,
        size,
        mode
      };
      drawLine(ctxRef.current, data);
      socket.emit("drawing", { roomId, data });
      prev.current = { x, y };
    }
  };

  const handleEnd = () => {
    setDrawing(false);
    prev.current = null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("mousedown", handleStart as EventListener);
    canvas.addEventListener("mousemove", handleMove as EventListener);
    window.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("touchstart", handleStart as EventListener);
    canvas.addEventListener("touchmove", handleMove as EventListener);
    window.addEventListener("touchend", handleEnd);
    return () => {
      canvas.removeEventListener("mousedown", handleStart as EventListener);
      canvas.removeEventListener("mousemove", handleMove as EventListener);
      window.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("touchstart", handleStart as EventListener);
      canvas.removeEventListener("touchmove", handleMove as EventListener);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [drawing, tool, penSize, eraserSize, strokeColor]);

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `doodleup-${roomId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setToastMsg("Image downloaded successfully!");
  };

  const clearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the canvas for everyone?")) {
      socket.emit("clear-room", { roomId });
    }
  };

  useEffect(() => {
    socket.on("drawing", ({ data }: { data: DrawData }) => {
      if (ctxRef.current) drawLine(ctxRef.current, data);
    });
    socket.on("drawing-history", (history: DrawData[]) => {
      history.forEach(data => ctxRef.current && drawLine(ctxRef.current, data));
    });
    socket.on("clear-canvas", () => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (canvas && ctx) {
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      setToastMsg("Canvas cleared by a participant.");
    });
    
    socket.on("room-joined", () => {
      setToastMsg("Connected to room: " + roomId);
    });

    return () => {
      socket.off("drawing");
      socket.off("drawing-history");
      socket.off("clear-canvas");
      socket.off("room-joined");
    };
  }, [roomId]);

  return (
    <div>
      <Toolbar
        tool={tool}
        setTool={setTool}
        penSize={penSize}
        setPenSize={setPenSize}
        eraserSize={eraserSize}
        setEraserSize={setEraserSize}
        strokeColor={strokeColor}
        setStrokeColor={setStrokeColor}
        onClear={clearCanvas}
        onDownload={downloadCanvas}
      />
      <canvas
        ref={canvasRef}
        className="w-screen h-screen touch-none"
        style={{
          touchAction: "none",
          background: BG_COLOR,
          cursor: cursorStyle,
        }}
      />
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
    </div>
  );
};

export default Canvas;
