import Link from "next/link"

function categories() {
  
  const cat_data=[
    {icon:"",
     text:"Smartphones",
     posts:"11",
     members:"2000"
    },

     {icon:"",
     text:"Laptops",
     posts:"11",
     members:"2000"
    },
 {icon:"",
     text:"Gaming",
     posts:"11",
     members:"2000"
    },
 {icon:"",
     text:"Audio",
     posts:"11",
     members:"2000"
    },
 {icon:"",
     text:"Air Purifier",
     posts:"11",
     members:"2000"
    },
 {icon:"",
     text:"Televsions",
     posts:"11",
     members:"2000"
    },

  ]

    return (
    <div>
   
   <div className="grid  grid-cols-3 gap-5   ">
    {cat_data.map((each,index)=>(
        <Link  href="" key={index} className= "bg-[#1F2937] text-xl p-6 rounded-xl h-max">
          <span>{each.icon}</span>
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