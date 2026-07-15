import Link from "next/link";

async function Trending() {

  const res = await fetch(
    "https://forums-backend-production-b81e.up.railway.app/api/posts/trending",
    {
      cache: "no-store",
    }
  );

  const trending_disc_data = await res.json();


  return (
    <div>

      <div className="text-2xl md:m-2">
        Trending Discussions
      </div>


      <div className="flex flex-col">

        {
          trending_disc_data.map((each) => (

            <div
              key={each._id}
              className="bg-[#1F2937] m-2 p-3 rounded-xl font-serif font-semibold text-xl"
            >

              <Link
                className="hover:text-[#2364DB] ml-5"
                href={`/posts/${each.category}/${each._id}`}
              >
                {each.title}
              </Link>


              <div className="flex md:ml-5 md:p-2 space-x-6">

                <div
                  className="rounded-2xl text-[#D1D5D1] text-xs p-2 w-28 text-center font-serif border font-semibold"
                >
                  {each.category}
                </div>


                <div className="text-[#8C8479] text-lg">
                  {each.commentsCount || 0} replies
                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Trending;  