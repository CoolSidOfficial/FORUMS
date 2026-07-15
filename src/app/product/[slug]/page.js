import Image from "next/image";

export default async function ProductPage({ params }) {

  const { slug } = await params;


  const res = await fetch(
    `https://forums-backend-production-b81e.up.railway.app/api/product/${slug}`,
    {
      cache:"no-store",
    }
  );


  if(!res.ok){

    return (
      <div className="text-white p-10">
        Product not found
      </div>
    );

  }


  const product = await res.json();



  return (

    <div className="min-h-screen bg-black text-white p-6">


      <div className="
        max-w-5xl
        mx-auto
        bg-gray-900
        rounded-3xl
        p-8
        border
        border-gray-800
      ">


        <div className="
          flex
          flex-col
          md:flex-row
          gap-8
        ">


          {/* IMAGE */}

          <div className="md:w-1/3">

            {product.image && (

              <Image
                src={product.image}
                width={400}
                height={400}
                alt={product.title}
                className="rounded-xl"
              />

            )}

          </div>




          {/* DETAILS */}

          <div className="flex-1">


            <h1 className="text-3xl font-bold">
              {product.title}
            </h1>


            <p className="text-gray-400 mt-3">
              {product.platform}
            </p>


            <p className="text-green-400 text-3xl font-bold mt-5">
              ₹{product.price}
            </p>



            <p className="mt-5 text-gray-300">
              {product.description}
            </p>




            <a
              href={product.originalUrl}
              target="_blank"
              className="
              inline-block
              mt-6
              bg-orange-500
              text-black
              px-5
              py-3
              rounded-xl
              font-bold
              "
            >
              View Product
            </a>


          </div>


        </div>


      </div>




      {/* DISCUSSION */}


      <div className="
        max-w-5xl
        mx-auto
        mt-10
        bg-gray-900
        rounded-3xl
        p-8
        border
        border-gray-800
      ">


        <h2 className="text-3xl font-bold">
          Community Discussion
        </h2>


        <p className="text-gray-400 mt-2">
          Share your experience with this product.
        </p>



        <textarea
          placeholder="Write a comment..."
          className="
          w-full
          mt-5
          bg-black
          border
          border-gray-700
          rounded-xl
          p-4
          "
          rows="5"
        />



        <button
          className="
          mt-4
          bg-blue-600
          px-6
          py-3
          rounded-xl
          font-bold
          "
        >
          Post Comment
        </button>


      </div>



    </div>

  );

}