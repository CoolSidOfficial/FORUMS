"use client";

import Link from "next/link";
import { useState } from "react";
import useNavbarAuth from "@/app/hooks/useNavbarAuth";
function Header() {
  const { user, loading } = useNavbarAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("https://forums-backend-production-b81e.up.railway.app/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.reload(); // refresh UI
  };

  return (
    <div>
      <div className="flex items-center border-b border-[#0a3592] p-1 font-mono font-extrabold m-5 gap-5">

        <div className="text-[#286cc5] text-3xl">
          Coolguide forum
        </div>

        <div className="p-3 bg-[#14274E] rounded hover:text-[#8cadf0]">
          Electronics Hub
        </div>

        <input
          type="search"
          placeholder="Search Discussions.."
          className="ml-auto border border-gray-200 rounded h-9 w-xs text-white"
        />

        <Link className="bg-[#EA580C] md:text-lg p-2" href="/products-search">
          Product Search
        </Link>

        <Link className="bg-[#2563EB] md:text-lg p-2" href="https://coolguide.live">
          Main Site
        </Link>

        {/* 🔥 THIS IS THE CHANGE */}
        {loading ? null : user ? (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="border md:text-lg p-2 rounded"
            >
              👤 {user.name}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 border bg-white text-black shadow rounded">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link className="border md:text-lg p-2" href="/authenticate/login">
            Register/Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;