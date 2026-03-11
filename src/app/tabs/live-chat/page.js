"use client"

import Link from "next/link"
import useAuth from "@/app/hooks/useAuth";

export default function Chat() {

  const { user, loading } = useAuth();

  const messages = [
    { username: 'T', fullName: 'TechReviewer', text: 'Just got the new iPhone 15 Pro Max! The camera quality is insane', time: 'Just now' },
    { username: 'P', fullName: 'PhotoPro', text: "How's the battery life compared to iPhone 14 Pro?", time: '30 seconds ago' },
    { username: 'M', fullName: 'MobileExpert', text: 'Much better! Getting almost 2 days with moderate usage', time: '1 minute ago' },
    { username: 'G', fullName: 'GamerDude', text: 'Anyone tried gaming on it? Performance looks promising', time: '2 minutes ago' },
    { username: 'A', fullName: 'AudioPhile', text: 'The spatial audio with AirPods Pro is mind-blowing!', time: '3 minutes ago' },
  ];

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  return (
    <div>

      {/* Header */}
      <div className="flex items-center mb-6">
        <span className="text-3xl">Live Electronics Chat</span>

        <span className="border bg-[#12342E] text-[#4ADE80] ml-4 p-2 rounded-xl">
          0 Online now
        </span>

        <Link
          href="/chat-room"
          className="bg-[#15803D] rounded-2xl text-black text-lg p-2 ml-auto"
        >
          Join full Chat Room
        </Link>
      </div>

      {/* Chat Messages */}
      <div className="space-y-4">

        {messages.map((msg, index) => (
          <div key={index} className="flex items-start gap-3">

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {msg.username}
            </div>

            {/* Message */}
            <div>
              <div className="text-sm text-gray-400">
                {msg.fullName} • {msg.time}
              </div>

              <div className="text-white">
                {msg.text}
              </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}