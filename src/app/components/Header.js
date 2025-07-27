import Link from "next/link"

function Header() {
  return (
    <div>
        <div className="flex items-center border-b border-[#0a3592] p-1 font-mono font-extrabold m-5 gap-5" > 
            <div className="text-[#286cc5]   text-3xl ">Coolguide forum</div>
            <div className="p-3  bg-[#14274E] rounded hover:text-[#8cadf0] ">Electronics Hub</div>
            <input type="search" placeholder="Search Discussions.." className="ml-auto border border-gray-200 rounded  h-9 w-xs text-white"></input>
            <Link className="bg-[#EA580C] md:text-lg p-2" href="">Product Search</Link>
            <Link className="bg-[#2563EB] md:text-lg p-2" href="">Main Site</Link>
            <Link  className="border md:text-lg p-2"href="/login">Login</Link>
        </div>
    </div>
  )
}

export default Header