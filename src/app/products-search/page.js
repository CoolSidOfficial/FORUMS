import Link from "next/link"
export default function ProductSearch(){
  const product_data = [
  {
    name: "iPhone 15 Pro Max 256GB",
    price: 134900,
    rating: 4.3,
    platform: "amazon.in",
    comments: 89,
    users: 45,
    active_minutes_ago: 2
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 129999,
    rating: 4.5,
    platform: "flipkart.com",
    comments: 67,
    users: 32,
    active_minutes_ago: 5
  },
  {
    name: "MacBook Pro M3 14-inch",
    price: 169900,
    rating: 4.7,
    platform: "amazon.in",
    comments: 124,
    users: 78,
    active_minutes_ago: 10
  },
  {
    name: "AirPods Pro (2nd Gen)",
    price: 24900,
    rating: 4.4,
    platform: "flipkart.com",
    comments: 156,
    users: 89,
    active_minutes_ago: 15
  }
];

    return(
    <div >
        <header className="flex bg-black p-4 items-center border-b-amber-100">
            <Link href="/tabs/categories"  className="font-semibold p-4"> &#8592; Back to forum</Link>
            <div className="text-2xl ml-4">Product Search</div>
            <div className="bg-orange-500 w-max rounded-xl  text-xs p-1 ml-4 text-center">Amazon & Flipkart</div>
        </header>
        <div className=" flex flex-col mt-40 items-center ">
            <div className="bg-[#072a5f] p-6 rounded-lg ">
                <div className="text-white text-4xl ">Find Product Comments</div>
                <div className="text-gray-500 text-lg mt-6">Paste any Amazon or Flipkart product link to find or create comment section</div>
                <input className="text-white border text-xl md:w-[1000px] h-10 rounded-lg solid mt-10 p-4" placeholder="Paste Amazon or Flipkart Product Url Here...."></input>
                <Link href="" className="bg-amber-600 p-2 ml-4 text-xl font-bold " >Search</Link>
                <ul className="p-4 text-gray-500 list-disc text-lg " >
                    <li>Supports Amazon.in and Flipkart.com product Links</li>

                    <li>If no comments exist , a new comment section will be created</li>
                    
                    <li>Anyone with the same product link can join the discussion</li>
                </ul>
            </div>
            <div>
                <div className="text-3xl p-4">Recent Product Discussions</div>
                <div className="grid grid-cols-2 gap-5"> 
                {product_data.map((each,index)=>(
                  <div key={index} className="p-8  bg-emerald-800 rounded  ">
                   <span className="text-xl">{each.name}</span>
                   <span className="ml-4">{each.platform}</span>
                   <br></br>
                   <span className="text-green-400">${each.price}</span>
                   <span className="m-2 text-yellow-200">{each.rating}</span>
                   <br></br>
                   
                   <span>{each.comments} comments </span>
                   <span className="ml-8">{each.users} users</span>
                   <br></br>
                   <span>Active {each.active_minutes_ago} minutes ago</span>
                   <Link href="" className="ml-52 bg-orange-600 p-2 text-center rounded "> View Comments</Link>
                  </div>
                ))}
                </div> 
            </div>
            <div className="">
                <div>Popular Product Categories</div>
                <div>Most discussed product types</div>
                <div className="flex">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                </div>

            </div>

        </div>
    </div>
)

}


