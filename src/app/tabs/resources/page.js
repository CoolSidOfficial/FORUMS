import Link from "next/link"

function resources() {
 const  resources_guide=[
    {"id":1,"title":"Buying Guides","short_desc":"Expert Recommendations for every Budget","link":""},
    {"id":2,"title":"Troubleshooting","short_desc":"Expert Recommendations for every Budget","link":""},
    {"id":3,"title":"Video Tutorials","short_desc":"Watch Videos related to our products","link":""},
  ]
  return (
    <>
    <div className="text-xl font-bold">Resources & Guides</div>
    <div className="grid grid-cols-3  gap-4">
      {resources_guide.map((resource) => (
        <Link href={resource.link} key={resource.id} className="bg-[#1F2937] rounded p-6 m-2 font-bold">
        <div className="text-xl">{resource.title}</div>
        <div className=" text-[#9CA3A4]">{resource.short_desc}</div> </Link>
      ))
}
      </div>{/* grid  */}
      </>

)
}
export default resources