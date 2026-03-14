"use client";
import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function ChatRoom() {
  const socketRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);

  const [username] = useState(
    "User_" + Math.floor(Math.random() * 1000)
  );

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("connect", () => {
      setConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
    });

    socketRef.current.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on("user_joined", (msg) => {
      setMessages((prev) => [...prev, { system: true, text: msg }]);
    });

    socketRef.current.on("user_left", (msg) => {
      setMessages((prev) => [...prev, { system: true, text: msg }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      username,
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socketRef.current.emit("send_message", messageData);

    setInput("");
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#111827] p-6">

        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Live Chat Room</h1>

            <span
              className={`text-sm px-3 py-1 rounded-full ${
                connected
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {connected ? "Connected" : "Disconnected"}
            </span>
          </div>

          <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-black space-y-3">

            {messages.length === 0 && (
              <p className="text-gray-400 text-center">
                No messages yet...
              </p>
            )}

            {messages.map((msg, index) => {

              if (msg.system) {
                return (
                  <div
                    key={index}
                    className="text-center text-gray-400 text-sm italic"
                  >
                    {msg.text}
                  </div>
                );
              }

              const isMe = msg.username === username;

              return (
                <div
                  key={index}
                  className={`flex ${
                    isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      isMe
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <div className="text-xs font-semibold opacity-70">
                      {msg.username}
                    </div>

                    <div>{msg.text}</div>

                    <div className="text-[10px] opacity-60 text-right">
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 mt-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 text-black focus:ring-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}