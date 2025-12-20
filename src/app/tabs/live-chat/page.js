import Link from "next/link"
function chat() {
  const messages = [
    { username: 'T', fullName: 'TechReviewer', text: 'Just got the new iPhone 15 Pro Max! The camera quality is insane', time: 'Just now' },
    { username: 'P', fullName: 'PhotoPro', text: "How's the battery life compared to iPhone 14 Pro?", time: '30 seconds ago', typing: true },
    { username: 'M', fullName: 'MobileExpert', text: 'Much better! Getting almost 2 days with moderate usage', time: '1 minute ago' },
    { username: 'G', fullName: 'GamerDude', text: 'Anyone tried gaming on it? Performance looks promising', time: '2 minutes ago' },
    { username: 'A', fullName: 'AudioPhile', text: 'The spatial audio with AirPods Pro is mind-blowing!', time: '3 minutes ago' },
  ];
  return (
    <div>
      <div className="flex" >
      <span className="text-3xl">Live Electronics Chat</span>
      <span className="border solid bg-[#12342E]  text-[#4ADE80] md:ml-4  p-2  rounded-xl">0 Online now</span>
      <Link href="" className="bg-[#15803D] rounded-2xl text-black  text-lg p-2 ml-auto"> Join full Chat Room</Link>
      
      </div>

    </div>
  )
}

export default chat