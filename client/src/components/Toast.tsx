import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2700);
    
    const unmountTimer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, [message, onClose]);

  return (
    <div 
      className={`fixed bottom-6 right-6 bg-white border border-gray-200 text-gray-800 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 z-[60] transition-all duration-300 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
        <svg width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span className="font-semibold text-sm mr-2">{message}</span>
      <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-600 transition">
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
