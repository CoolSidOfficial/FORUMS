"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Login() {
  const brand_name = "CoolGuide";
  const desc = "Login to your account to continue the discussion";
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(
        "https://forums-backend-production-b81e.up.railway.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
         localStorage.setItem("token", data.token);
         router.push("/");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-screen items-center bg-[#030712]">

      <header className="flex bg-[#1F2937] p-4 items-center border-b border-b-gray-600 w-full">
        <Link href="/tabs/categories" className="font-semibold p-4 text-white hover:text-gray-300">
          ← Back to forum
        </Link>
        <div className="text-2xl ml-4 text-white">CoolGuide</div>
        <div className="bg-orange-500 w-max rounded-xl text-xs p-1 ml-4 text-center text-white">
          Login
        </div>
      </header>

      <div className="text-white m-10 bg-[#1F2937] w-full max-w-md p-6 text-xl flex flex-col items-center rounded-lg shadow-lg">

        <div className="text-2xl font-bold mb-2">
          Welcome Back to {brand_name}
        </div>

        <div className="mb-6 text-center text-gray-300 text-base">
          {desc}
        </div>

        {/* ✅ Show error message instead of alert() */}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-500/20 border border-red-500 text-red-400 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full gap-4 font-mono"
        >
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-white">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="border border-gray-600 rounded p-2 bg-[#374151] text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-white">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              // ✅ Fixed: same background fix
              className="border border-gray-600 rounded p-2 bg-[#374151] text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-mono rounded py-2 mt-2 hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="p-4 text-lg">
          Don&apos;t have an account?{" "}
          <Link
            className="text-blue-500 hover:text-blue-400"
            href="/authenticate/signup"
          >
            Sign up here
          </Link>
        </div>

        <div className="text-lg text-gray-400">OR</div>

        <div className="text-lg p-4">Continue with Google</div>

        {/* ✅ Fixed: points to your backend URL, not a relative Next.js route */}
        
       <a    href="https://forums-backend-production-b81e.up.railway.app/auth/google"
          className="border border-gray-500 w-max px-6 py-3 text-lg rounded hover:bg-white hover:text-black transition-colors font-bold">
         Sign in with Google
        </a>

      </div>
    </div>
  );
}

export default Login;