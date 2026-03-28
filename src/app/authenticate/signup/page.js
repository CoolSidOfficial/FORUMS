"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Signup() {
  const brand_name = "CoolGuide";
  const desc = "Create your account to start discussing electronics";
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.cu_pass.value;

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "https://forums-backend-production-b81e.up.railway.app/auth/signup", // ✅ fixed route

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful ✅");
        router.push("/authenticate/login");
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-screen items-center bg-[#030712]">

      <header className="flex bg-[#1F2937] p-4 items-center border-b-amber-100 m-2">
        <Link href="/tabs/categories" className="font-semibold p-4">
          ← Back to forum
        </Link>
        <div className="text-2xl ml-4">CoolGuide</div>
        <div className="bg-orange-500 w-max rounded-xl text-xs p-1 ml-4 text-center">
          Signup
        </div>
      </header>

      <div className="text-white m-10 bg-[#1F2937] w-full max-w-md p-6 text-xl flex flex-col items-center rounded shadow-lg">

        <div className="text-2xl font-bold mb-2">Join {brand_name}</div>
        <div className="mb-6 text-center">{desc}</div>

        {/* ✅ FIXED: use onSubmit instead of action */}
        <form
          onSubmit={handleSignup}
          className="flex flex-col w-full gap-4"
        >

          <div className="flex flex-col">
            <label className="mb-1">Username:</label>
            <input
              type="text"
              name="username"
              className="border rounded p-2"
              required
            />
          </div>

          {/* ✅ ADDED EMAIL */}
          <div className="flex flex-col">
            <label className="mb-1">Email:</label>
            <input
              type="email"
              name="email"
              className="border rounded p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Password:</label>
            <input
              type="password"
              name="password"
              className="border rounded p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Confirm Password:</label>
            <input
              type="password"
              name="cu_pass"
              className="border rounded p-2 text-black"
              required
            />
          </div>

          <input
            type="submit"
            value="Create Account"
            className="bg-blue-600 text-white font-mono rounded py-2 mt-2 hover:bg-blue-700 cursor-pointer"
          />
        </form>

        <div className="text-lg mt-4">OR</div>

        <div className="text-lg p-4">Continue with Google</div>

        <Link
          href="http://localhost:5000/auth/google"
          className="border solid w-max p-2 text-4xl hover:text-amber-800 font-bold"
        >
          Continue with Google
        </Link>

      </div>
    </div>
  );
}

export default Signup;