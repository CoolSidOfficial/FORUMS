import Link from "next/link"

function categories() {
  
  const cat_data=[
    {icon:"/icons/smartphone.png",
     text:"Smartphones",
     posts:"1",
     members:"1",
     link:"/posts/smartphones"
    },

     {icon:"/icons/laptop.png",
     text:"Laptops",
     posts:"1",
     members:"1",
     link:"/posts/laptops"
    },
 {icon:"/icons/console.png",
     text:"Gaming",
     posts:"1",
     members:"2",
     link:"/posts/gaming"
    },
 {icon:"/icons/audio.png",
     text:"Audio",
     posts:"1",
     members:"1",
     link:"/posts/audio"
    },
 {icon:"/icons/af.png",
     text:"Air Purifiers",
     posts:"11",
     members:"1",
     link:"/posts/air-purifiers"
    },
 {icon:"/icons/television.png",
     text:"Televsions",
     posts:"11",
     members:"1",
     link:"/posts/television"
    },

  ]

    return (
    <div>
   
   <div className="grid  grid-cols-3 gap-5   ">
    {cat_data.map((each,index)=>(
        <Link  href={each.link} key={index} className= "bg-[#1F2937] text-large p-6 rounded-xl h-max">
          <img src={each.icon} width={40} alt="logo" />
          <span className="text-2xl font-semibold">{each.text}</span>
        <div>Discuss {each.text} and get expert advise</div>
        <span className="m-1">
            {each.posts} Posts
        </span>
        <span className="ml-20">
            Members {
                each.members
            }
        </span>
    </Link>
        

    ))

    }
    

   </div>


    </div>

  )
}

export default categories