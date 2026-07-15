"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductSearch() {

  const router = useRouter();

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);


  const product_data = [
    {
      slug: "b0fn9wn6xd",
      name: "ASUS Vivobook 16",
      price: 68990,
      rating: 4.4,
      platform: "amazon.in",
      comments: 89,
      users: 45,
      active_minutes_ago: 2,
    },
    {
      slug: "iphone-demo",
      name: "iPhone 15 Pro Max 256GB",
      price: 134900,
      rating: 4.3,
      platform: "amazon.in",
      comments: 89,
      users: 45,
      active_minutes_ago: 5,
    },
    {
      slug: "s24-ultra-demo",
      name: "Samsung Galaxy S24 Ultra",
      price: 129999,
      rating: 4.5,
      platform: "flipkart.com",
      comments: 67,
      users: 32,
      active_minutes_ago: 10,
    },
    {
      slug: "macbook-demo",
      name: "MacBook Pro M3 14-inch",
      price: 169900,
      rating: 4.7,
      platform: "amazon.in",
      comments: 124,
      users: 78,
      active_minutes_ago: 15,
    },
  ];



  const product_categories = [
    {
      id:1,
      name:"Smartphones",
      discussed_times:234
    },
    {
      id:2,
      name:"Laptops",
      discussed_times:180
    },
    {
      id:3,
      name:"Audio",
      discussed_times:150
    },
    {
      id:4,
      name:"Gaming",
      discussed_times:120
    },
  ];



  async function handleSearch(){

    if(!url) return;


    setLoading(true);


    try{

      const res = await fetch(
        "https://forums-backend-production-b81e.up.railway.app/api/product",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify({
            url
          }),
        }
      );


      const data = await res.json();


      console.log(data);



      if(data?.slug){

        router.push(`/product/${data.slug}`);

      }



    }
    catch(err){

      console.log(
        "Product search failed:",
        err
      );

    }
    finally{

      setLoading(false);

    }

  }




  return (

<div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">


<header className="flex items-center gap-4 p-5 border-b border-gray-800">


<Link
href="/tabs/categories"
className="text-gray-300 hover:text-white"
>
← Back
</Link>


<h1 className="text-2xl font-bold">
Product Discussions
</h1>


<span className="bg-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
Amazon + Flipkart
</span>


</header>




<main className="px-5 flex flex-col items-center">



<section
className="
mt-20
w-full
max-w-5xl
bg-gradient-to-br
from-blue-900
to-blue-950
rounded-3xl
p-8
border
border-blue-800
"
>


<h2 className="text-4xl md:text-5xl font-bold">

Discover What Users Say About Products

</h2>



<p className="mt-4 text-gray-300 text-lg">

Paste any Amazon or Flipkart product link and join the discussion.

</p>




<div className="flex flex-col md:flex-row gap-4 mt-10">


<input

value={url}

onChange={(e)=>setUrl(e.target.value)}

placeholder="Paste product URL..."

className="
flex-1
h-14
rounded-xl
bg-black
border
border-gray-700
px-5
text-lg
outline-none
focus:border-orange-500
"

/>



<button

onClick={handleSearch}

disabled={loading}

className="
bg-orange-500
hover:bg-orange-600
text-black
font-bold
rounded-xl
px-10
"

>

{
loading
?
"Searching..."
:
"Find Discussion"
}


</button>


</div>




<div className="flex gap-3 mt-6 flex-wrap">


<span className="bg-black px-4 py-2 rounded-full text-sm">
✓ Amazon
</span>


<span className="bg-black px-4 py-2 rounded-full text-sm">
✓ Flipkart
</span>


<span className="bg-black px-4 py-2 rounded-full text-sm">
✓ Community Reviews
</span>


</div>


</section>






<section className="w-full max-w-6xl mt-16">


<h2 className="text-3xl font-bold mb-6">
Recent Discussions
</h2>




<div className="grid md:grid-cols-2 gap-6">


{
product_data.map((each,index)=>(


<div

key={index}

className="
bg-gray-900
border
border-gray-800
rounded-2xl
p-6
hover:border-orange-500
transition
"

>



<div className="flex justify-between">


<h3 className="font-bold text-xl">
{each.name}
</h3>


<span className="text-yellow-400">
⭐ {each.rating}
</span>


</div>



<p className="text-gray-400 mt-2">
{each.platform}
</p>



<p className="text-green-400 text-xl font-bold mt-4">

₹{each.price.toLocaleString()}

</p>




<div className="flex gap-5 mt-4 text-sm">


<span>
💬 {each.comments} comments
</span>


<span>
👥 {each.users} users
</span>


</div>




<p className="text-gray-500 text-sm mt-3">

🟢 Active {each.active_minutes_ago} min ago

</p>




<Link

href={`/product/${each.slug}`}

className="
inline-block
mt-5
bg-orange-500
text-black
font-bold
px-5
py-2
rounded-lg
"

>

Join Discussion →

</Link>



</div>


))
}



</div>


</section>







<section

className="
w-full
max-w-6xl
mt-16
bg-gray-900
border
border-gray-800
rounded-3xl
p-8
"

>



<h2 className="text-3xl font-bold">
Popular Categories
</h2>


<p className="text-gray-400 mt-2">
Most discussed product types
</p>




<div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">


{
product_categories.map(each=>(


<div

key={each.id}

className="
bg-gray-800
rounded-xl
p-5
text-center
hover:bg-gray-700
transition
"

>


<div className="text-5xl">

{
each.name==="Smartphones"
?
"📱"
:
each.name==="Laptops"
?
"💻"
:
each.name==="Audio"
?
"🎧"
:
"🎮"
}

</div>



<h3 className="font-bold mt-3">
{each.name}
</h3>



<p className="text-gray-400 text-sm mt-2">
{each.discussed_times} discussions
</p>



</div>


))
}


</div>



</section>



</main>


</div>

  );

}