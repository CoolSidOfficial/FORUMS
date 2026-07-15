"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/store/authStore";

export default function ProfilePage() {

  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const setUser = useAuthStore((s) => s.setUser);

  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();



  // Load current user name into input
  useEffect(() => {

    if (user?.name) {
      setName(user.name);
    }

  }, [user]);




  // Authentication check
  if (loading) {
    return (
      <div className="text-center mt-10 text-white">
        Loading profile...
      </div>
    );
  }


  if (!user) {
    router.replace("/authenticate/login");
    return null;
  }





  const handleUpdate = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    if (!name.trim()) {

      setError("Name cannot be empty.");
      return;

    }


    setUpdating(true);



    try {

      const token = localStorage.getItem("token");


      const res = await fetch(
        "https://forums-backend-production-b81e.up.railway.app/auth/update-profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name
          }),

        }
      );



      if (!res.ok) {

        const data = await res.json();

        setError(
          data.message || "Update failed."
        );

        return;
      }




      const data = await res.json();



      // Update navbar instantly
      setUser({
        ...user,
        name: data.user?.name || name
      });



      setSuccess(
        "Profile updated successfully ✅"
      );



    } catch (err) {


      setError(
        "Something went wrong. Please try again."
      );


    } finally {

      setUpdating(false);

    }

  };





  return (

    <div
      className="
      max-w-5xl
      mx-auto
      p-6
      space-y-6
      font-mono
      "
    >



      {/* Profile Header */}

      <div
        className="
        bg-[#020617]
        border
        border-blue-900
        rounded-2xl
        overflow-hidden
        shadow-xl
        "
      >


        {/* Cover */}

        <div
          className="
          h-40
          bg-gradient-to-r
          from-blue-900
          via-indigo-900
          to-purple-900
          "
        />



        <div
          className="
          p-6
          relative
          "
        >



          {/* Avatar */}

          <div
            className="
            absolute
            -top-14
            w-28
            h-28
            rounded-full
            bg-blue-600
            border-4
            border-[#020617]
            flex
            items-center
            justify-center
            text-4xl
            font-bold
            text-white
            "
          >

            {user?.name?.charAt(0)?.toUpperCase() || "U"}

          </div>




          <div className="pt-16">


            <h1
              className="
              text-3xl
              font-bold
              text-white
              "
            >
              {user.name}
            </h1>



            <p className="text-gray-400">
              {user.email}
            </p>



            <p className="mt-3 text-gray-300">
              Tech enthusiast • Electronics lover • CoolForums member
            </p>




            {/* Stats */}

            <div
              className="
              flex
              gap-10
              mt-6
              "
            >


              <div>
                <p className="text-xl font-bold text-blue-400">
                  0
                </p>

                <p className="text-gray-400 text-sm">
                  Posts
                </p>
              </div>



              <div>
                <p className="text-xl font-bold text-blue-400">
                  0
                </p>

                <p className="text-gray-400 text-sm">
                  Comments
                </p>
              </div>



              <div>
                <p className="text-xl font-bold text-blue-400">
                  New
                </p>

                <p className="text-gray-400 text-sm">
                  Rank
                </p>
              </div>


            </div>



          </div>



        </div>


      </div>






      {/* Edit Profile */}

      <div
        className="
        bg-[#020617]
        border
        border-blue-900
        rounded-2xl
        p-6
        shadow-xl
        "
      >


        <h2
          className="
          text-xl
          font-bold
          text-blue-400
          mb-5
          "
        >
          Edit Profile
        </h2>




        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >



          <div>

            <label className="text-gray-400 text-sm">
              Email
            </label>


            <input
              type="email"
              value={user.email}
              disabled
              className="
              mt-2
              w-full
              p-3
              rounded-xl
              bg-gray-900
              border
              border-gray-700
              text-gray-500
              "
            />

          </div>





          <div>

            <label className="text-gray-300 text-sm">
              Display Name
            </label>


            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="
              mt-2
              w-full
              p-3
              rounded-xl
              bg-[#14274E]
              border
              border-blue-900
              text-white
              focus:outline-none
              focus:border-blue-400
              "
            />


          </div>





          {
            error && (

              <p className="text-red-400">
                {error}
              </p>

            )
          }



          {
            success && (

              <p className="text-green-400">
                {success}
              </p>

            )
          }






          <button
            type="submit"
            disabled={updating}
            className="
            bg-blue-600
            hover:bg-blue-500
            px-6
            py-3
            rounded-xl
            text-white
            transition
            disabled:opacity-50
            "
          >

            {
              updating
              ? "Saving..."
              : "Save Changes"
            }


          </button>



        </form>



      </div>





    </div>

  );

}