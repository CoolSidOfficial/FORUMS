"use client";

import Link from "next/link";
import { useState } from "react";
import useAuthStore from "@/app/store/authStore";

function Header() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const logout = useAuthStore((s) => s.logout);

  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  const handleLogout = async () => {
    await fetch(
      "https://forums-backend-production-b81e.up.railway.app/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    logout();
    setOpen(false);
  };


  return (

    <header
      className="
      sticky top-0 z-50
      backdrop-blur-md
      bg-[#020617]/90
      border-b border-blue-900
      px-4 md:px-8 py-3
      "
    >

      <div className="flex items-center gap-4">


        {/* Logo */}
        <Link
          href="/"
          className="
          font-extrabold
          text-2xl
          md:text-3xl
          text-blue-400
          tracking-tight
          "
        >
          Cool<span className="text-white">Forums</span>
        </Link>



        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-3 ml-5">


          <Link
            href="/"
            className="
            px-3 py-2
            rounded
            hover:bg-blue-900
            "
          >
            Home
          </Link>


          <Link
            href="https://coolguide.live/"
            className="
            px-3 py-2
            rounded
            hover:bg-blue-900
            "
          >
            Main Site
          </Link>


          <Link
            href="/tabs/trending"
            className="
            px-3 py-2
            rounded
            hover:bg-blue-900
            "
          >
            Trending 🔥
          </Link>


        </nav>



        {/* Search */}
        <div className="hidden md:flex ml-auto">

          <input
            type="search"
            placeholder="Search discussions..."
            className="
            w-64
            h-10
            rounded-lg
            border
            border-blue-900
            bg-[#0f172a]
            px-4
            outline-none
            focus:border-blue-400
            "
          />

        </div>



        {/* Product */}
        <Link
          href="/products-search"
          className="
          hidden md:block
          bg-orange-600
          px-3 py-2
          rounded-lg
          hover:bg-orange-500
          "
        >
          Products
        </Link>




        {/* User */}
        {!loading && (

          user ?

          <div className="relative ml-auto md:ml-0">

            <button
              onClick={()=>setOpen(!open)}
              className="
              flex items-center gap-2
              border border-blue-800
              px-3 py-2
              rounded-lg
              hover:bg-blue-950
              "
            >

              <span>
                👤
              </span>

              <span className="hidden md:block">
                {user.name}
              </span>

            </button>



            {
              open && (

                <div
                  className="
                  absolute
                  right-0
                  mt-3
                  w-48
                  bg-white
                  text-black
                  rounded-xl
                  shadow-xl
                  overflow-hidden
                  "
                >

                  <Link
                    href="/profile"
                    className="
                    block
                    px-4 py-3
                    hover:bg-gray-200
                    "
                  >
                    Profile
                  </Link>


                  <Link
                    href="/my-posts"
                    className="
                    block
                    px-4 py-3
                    hover:bg-gray-200
                    "
                  >
                    My Discussions
                  </Link>


                  <button
                    onClick={handleLogout}
                    className="
                    w-full
                    text-left
                    px-4 py-3
                    hover:bg-red-100
                    text-red-600
                    "
                  >
                    Logout
                  </button>


                </div>

              )
            }

          </div>


          :

          <Link
            href="/authenticate/login"
            className="
            border
            border-blue-400
            px-3 py-2
            rounded-lg
            hover:bg-blue-900
            "
          >
            Login
          </Link>

        )}



        {/* Mobile menu */}
        <button
          onClick={()=>setMobile(!mobile)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>


      </div>



      {/* Mobile menu */}

      {
        mobile && (

          <div
            className="
            md:hidden
            mt-4
            flex
            flex-col
            gap-3
            "
          >

            <input
              placeholder="Search..."
              className="
              h-10
              rounded
              bg-[#0f172a]
              border
              border-blue-900
              px-3
              "
            />


            <Link href="https://coolguide.live/">
              Main Site
            </Link>


            <Link href="/tabs/trending">
              Trending 🔥
            </Link>


            <Link href="/products-search">
              Products
            </Link>


          </div>

        )
      }


    </header>

  );
}


export default Header;