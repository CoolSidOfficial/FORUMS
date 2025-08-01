import React from 'react';

function Login() {
  const brand_name = "CoolGuide";
  const desc = "Login to your account to continue the discussion";

  return (
    <div className="flex flex-col justify-center min-h-screen items-center bg-black">
      <div className="text-white m-10 bg-[#1F2937] w-full max-w-md p-6 text-xl flex flex-col items-center rounded shadow-lg">
        <div className="text-2xl font-bold mb-2">Welcome Back to {brand_name}</div>
        <div className="mb-6 text-center">{desc}</div>

        <form action="http://20.120.176.155/auth/login" method="POST" className="flex flex-col w-full gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="border rounded p-2 text-black"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded p-2 text-black"
            />
          </div>

          <input
            type="submit"
            value="Login"
            className="bg-blue-600 text-white font-mono rounded py-2 mt-2 hover:bg-blue-700 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
