"use client";

import { useState } from "react";

export default function FloatingContact() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://t.me/LakodeiSerhii"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написати нам у Telegram"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <span
        className={`rounded-lg bg-gray-800 px-3 py-1.5 text-sm text-white shadow-lg transition-all duration-200 whitespace-nowrap ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Написати нам
      </span>

      {/* Button */}
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-green-600 shadow-lg transition-all duration-200 ${
          hovered ? "bg-green-700 scale-110" : ""
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 fill-white"
          aria-hidden="true"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 21l3.94-.876A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.93 6.64-1.68 7.932c-.126.56-.455.698-.922.433l-2.55-1.88-1.23 1.183c-.136.136-.25.25-.513.25l.183-2.598 4.724-4.267c.205-.183-.045-.284-.317-.101L8.13 14.49l-2.498-.78c-.543-.17-.554-.543.113-.803l9.73-3.752c.452-.164.849.101.455.485z"/>
        </svg>
      </span>
    </a>
  );
}
