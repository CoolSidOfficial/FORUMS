"use client";

import Link from "next/link";

export default function Chat() {

  const messages = [
    {
      username: "T",
      fullName: "TechReviewer",
      text: "Just got the new iPhone 15 Pro Max! The camera quality is insane",
      time: "6 months ago"
    },
    {
      username: "P",
      fullName: "PhotoPro",
      text: "How's the battery life compared to iPhone 14 Pro?",
      time: "4 months ago"
    },
    {
      username: "M",
      fullName: "MobileExpert",
      text: "Much better! Getting almost 2 days with moderate usage",
      time: "1 month ago"
    },
    {
      username: "G",
      fullName: "GamerDude",
      text: "Anyone tried gaming on it? Performance looks promising",
      time: "2 days ago"
    },
    {
      username: "A",
      fullName: "AudioPhile",
      text: "The spatial audio with AirPods Pro is mind-blowing!",
      time: "1 year ago"
    },
  ];


  return (

    <div
      className="
      bg-[#020617]
      border
      border-blue-900
      rounded-2xl
      p-5
      shadow-xl
      "
    >


      {/* Header */}

      <div className="
      flex
      items-center
      mb-6
      "
      >

        <div>

          <h2 className="
          text-2xl
          font-bold
          "
          >
            Live Electronics Chat
          </h2>


          <p className="text-gray-400 text-sm">
            Discuss gadgets with the community
          </p>

        </div>


        <div
          className="
          ml-4
          flex
          items-center
          gap-2
          bg-green-950
          text-green-400
          border
          border-green-700
          px-3
          py-2
          rounded-full
          text-sm
          "
        >

          <span className="
          w-2
          h-2
          bg-green-400
          rounded-full
          animate-pulse
          ">
          </span>

          1 Online

        </div>


        <Link
          href="/chat-room"
          className="
          ml-auto
          bg-green-600
          hover:bg-green-500
          text-black
          font-semibold
          px-4
          py-2
          rounded-xl
          transition
          "
        >
          Join Chat
        </Link>


      </div>



      {/* Messages */}

      <div
        className="
        space-y-4
        max-h-[420px]
        overflow-hidden
        "
      >

      {
        messages.map((msg,index)=>(

          <div
            key={index}
            className="
            flex
            gap-3
            group
            "
          >


            {/* Avatar */}

            <div
              className="
              w-11
              h-11
              rounded-full
              bg-gradient-to-br
              from-blue-500
              to-purple-600
              flex
              items-center
              justify-center
              font-bold
              text-white
              "
            >
              {msg.username}
            </div>



            <div
              className="
              flex-1
              bg-[#0f172a]
              rounded-xl
              p-3
              border
              border-gray-800
              group-hover:border-blue-700
              transition
              "
            >

              <div className="
              flex
              justify-between
              "
              >

                <span className="
                font-semibold
                text-blue-300
                "
                >
                  {msg.fullName}
                </span>


                <span className="
                text-xs
                text-gray-500
                "
                >
                  {msg.time}
                </span>

              </div>


              <p className="
              text-gray-200
              mt-1
              "
              >
                {msg.text}
              </p>


            </div>


          </div>

        ))
      }


      </div>



      {/* Bottom */}

      <div
        className="
        mt-5
        border-t
        border-gray-800
        pt-4
        text-center
        text-gray-400
        text-sm
        "
      >
        Join the discussion and share your tech experience 🚀
      </div>


    </div>

  );
}