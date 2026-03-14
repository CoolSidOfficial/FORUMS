"use client";

import { useState } from "react";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111827] p-6">
      
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Live Chat Room
        </h1>

        {/* Chat Box */}
        <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-black space-y-2">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">No messages yet...</p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-blue-100 text-gray-800 px-3 py-2 rounded-lg w-fit"
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex gap-3 mt-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 text-black focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-black px-5 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>

      </div>

    </div>
  );
}