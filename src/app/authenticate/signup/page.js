import React from 'react';
import Link from 'next/link';
function Signup() {
  const brand_name = "CoolGuide";
  const desc = "Create your account to start discussing electronics";

  return (
    <div className="flex flex-col justify-center min-h-screen items-center bg-[#030712]">
      <div className="text-white m-10 bg-[#1F2937] w-full max-w-md p-6 text-xl flex flex-col items-center rounded shadow-lg">
        <div className="text-2xl font-bold mb-2">Join {brand_name}</div>
        <div className="mb-6 text-center">{desc}</div>

        <form action="http://20.120.176.155/auth/signup" method="POST" className="flex flex-col w-full gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="border rounded p-2 "
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirm_password" className="mb-1">Confirm Password:</label>
            <input
              type="password"
              id="confirm_password"
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
         <div className='text-lg'>OR</div>
        <div className='text-lg p-4'>Continue with Google</div>
<Link href={""} className='border solid w-max p-2 text-4xl   hover:text-amber-800 font-bold'>Google</Link>

      </div>
    </div>
  );
}

export default Signup;
