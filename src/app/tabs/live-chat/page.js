import Link from "next/link"
function chat() {
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