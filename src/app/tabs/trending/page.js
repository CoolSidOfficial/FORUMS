
import Link from "next/link"
function trending() {
  let trending_disc_data=[
  {id: 1, heading: "iPhone 15 Pro Max Review Discussion", Category: "Smartphones", replies: 234, link: ""},
  {id: 2, heading: "Best Gaming Laptops Under $1500", Category: "Laptops", replies: 156, link: ""},
  {id: 3, heading: "PS5 vs Xbox Series X Performance", Category: "Gaming", replies: 189, link: ""},
  {id: 4, heading: "AirPods Pro 3 Leaked Features", Category: "Audio", replies: 98, link: ""}
]

  return (
    <div>
        <div className="text-2xl md:m-2">Trending Discussions</div>
        <div className="flex   flex-col">
          {
            trending_disc_data.map((each,index)=>(
              <div key={index} className=" bg-[#1F2937] m-2 p-3   rounded-xl fonr-serif font-semibold text-xl">
                <Link className=" hover:text-[#2364DB] ml-5" href={each.link}>{each.heading}</Link>
                <div className="flex  md:ml-5 md:p-2 space-x-6">
                 <div className="rounded-2xl  text-[#D1D5D1] text-xs p-2  w-28 text-center font-serif border solid font-semibold">{each.Category}</div>
                 <div className=" text-[#8C8479] text-lg">{each.replies} replies </div>
                 </div>
              </div>
            ))
          }


        </div>
    </div>
  )
}

export default trending