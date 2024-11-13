import React from "react";

interface ToastProps {
  message: string;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show }) => {
  return (
    <div
      className={`fixed top-4 right-4 flex items-center p-4 w-full max-w-xs text-white bg-green-500 rounded-lg shadow-lg transition-transform duration-500 ease-in-out 
        ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}
      style={{
        transition: "transform 0.5s ease, opacity 0.5s ease",
      }}
    >
      <svg
        className="w-6 h-6 mr-2 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4"
        />
      </svg>
      <span className="flex items-center">{message}</span>
    </div>
  );
};

export default Toast;
