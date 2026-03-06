import React from "react";
import type { Tool } from "../types/types";

// Replace this SVG with your real eraser logo if desired
const EraserIcon = ({ size = 20, color = "#555" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect
      x="3"
      y="10"
      width="12"
      height="6"
      rx="2"
      transform="rotate(-45 3 10)"
      fill={color}
      stroke="#333"
      strokeWidth="1.5"
    />
    <rect
      x="12"
      y="15"
      width="6"
      height="2.2"
      rx="1"
      transform="rotate(-45 12 15)"
      fill="#eee"
    />
  </svg>
);

const PEN_SIZES = [2, 5, 10, 16];
const COLORS = ["#222222", "#df4b26", "#2677fa", "#34c759", "#8237c9", "#fff700"];

interface ToolbarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  penSize: number;
  setPenSize: (size: number) => void;
  eraserSize: number;
  setEraserSize: (size: number) => void;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  onClear: () => void;
  onDownload: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  tool, setTool, penSize, setPenSize, eraserSize, setEraserSize,
  strokeColor, setStrokeColor, onClear, onDownload
}) => (
  <div
    className="absolute top-6 left-1/2 -translate-x-1/2
               flex flex-col gap-2 md:flex-row md:gap-6 items-center
               bg-white bg-opacity-95 p-3 md:p-4 rounded-2xl shadow-2xl border z-50"
    style={{minWidth: 340}}
  >
    {/* Pen Sizes */}
    <div className="flex gap-1 md:gap-2 items-center">
      {PEN_SIZES.map(size => (
        <button
          key={size}
          className={`rounded-full flex items-center justify-center border transition shadow-sm
            ${tool !== "eraser" && penSize === size ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-300"}
            bg-white hover:bg-blue-100`}
          style={{ width: 30, height: 30 }}
          onClick={() => { if(tool === "eraser") setTool("pen"); setPenSize(size); }}
          aria-label={`Pen size ${size}`}
        >
          <span style={{
            display: "block",
            width: size * 1.3,
            height: size * 1.3,
            background: strokeColor,
            borderRadius: "50%",
            border: "1.5px solid #bbb"
          }} />
        </button>
      ))}
    </div>

    {/* Colors */}
    <div className="flex gap-1 md:gap-2 items-center">
      {COLORS.map(c => (
        <button
          key={c}
          className={`rounded-full border-2 ${strokeColor === c && tool !== "eraser" ? 'border-black' : 'border-gray-200'}
            hover:ring-2 ring-blue-200`}
          style={{ background: c, width: 24, height: 24 }}
          onClick={() => { setStrokeColor(c); if(tool === "eraser") setTool("pen"); }}
          aria-label={`Color ${c}`}
        />
      ))}
      <label className="ml-2 cursor-pointer" title="Select custom color">
        <input
          type="color"
          value={strokeColor}
          disabled={tool === "eraser"}
          onChange={e => setStrokeColor(e.target.value)}
          className="w-7 h-7 p-0 m-0 border-0 align-middle bg-white rounded-full cursor-pointer"
          aria-label="Custom color"
          style={{ verticalAlign: "middle" }}
        />
      </label>
    </div>

    {/* Tool Selector */}
    <div className="flex gap-3 items-center">
      <button
        aria-label="Pen"
        className={`p-2 rounded-lg border flex items-center gap-1 font-semibold
          ${tool === "pen" ? "bg-blue-500 text-white border-blue-700" : "bg-gray-50 border-gray-300 text-gray-700"}`}
        onClick={() => setTool("pen")}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Pen
      </button>
      <button
        aria-label="Brush"
        className={`p-2 rounded-lg border flex items-center gap-1 font-semibold
          ${tool === "brush" ? "bg-blue-500 text-white border-blue-700" : "bg-gray-50 border-gray-300 text-gray-700"}`}
        onClick={() => setTool("brush")}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
        Brush
      </button>
      <button
        aria-label="Highlighter"
        className={`p-2 rounded-lg border flex items-center gap-1 font-semibold
          ${tool === "highlighter" ? "bg-blue-500 text-white border-blue-700" : "bg-gray-50 border-gray-300 text-gray-700"}`}
        onClick={() => setTool("highlighter")}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Highlighter
      </button>
      <button
        aria-label="Eraser"
        className={`p-2 rounded-lg border flex items-center gap-1 font-semibold
          ${tool === "eraser" ? "bg-blue-500 text-white border-blue-700" : "bg-gray-50 border-gray-300 text-gray-700"}`}
        onClick={() => setTool("eraser")}
      >
        <EraserIcon size={20} color={tool === "eraser" ? "#fff" : "#555"} />
        Eraser
      </button>
    </div>

    {/* Eraser Size Range */}
    {tool === "eraser" && (
      <div className="flex items-center gap-2 ml-2">
        <input
          type="range"
          min={8}
          max={40}
          value={eraserSize}
          onChange={e => setEraserSize(Number(e.target.value))}
          className="w-24"
          aria-label="Eraser size"
        />
        <div
          className="rounded-full border border-gray-500 bg-white"
          style={{
            width: eraserSize,
            height: eraserSize,
          }}
        />
      </div>
    )}

    {/* Action Buttons */}
    <div className="flex gap-2 ml-auto border-l pl-4 border-gray-200">
      <button
        onClick={onClear}
        className="p-2 rounded-lg border bg-red-50 text-red-600 border-red-200 hover:bg-red-100 font-semibold flex items-center gap-1 transition"
        title="Clear Canvas for everyone"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      <button
        onClick={onDownload}
        className="p-2 rounded-lg border bg-green-50 text-green-600 border-green-200 hover:bg-green-100 font-semibold flex items-center gap-1 transition"
        title="Download Image"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  </div>
);

export default Toolbar;
