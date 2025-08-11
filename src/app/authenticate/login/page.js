import React from 'react';
import Link from 'next/link';
function Login() {
  const brand_name = "CoolGuide";
  const desc = "Login to your account to continue the discussion";

  return (
    
    <div className="flex flex-col justify-center min-h-screen items-center bg-[#030712]">
        <header className="flex bg-[#1F2937] p-4 items-center border-b-amber-100">
            <Link href="/tabs/categories"  className="font-semibold p-4"> &#8592; Back to forum</Link>
            <div className="text-2xl ml-4">CoolGuide</div>
            <div className="bg-orange-500 w-max rounded-xl  text-xs p-1 ml-4 text-center">Login</div>
        </header>
      <div className="text-white m-10 bg-[#1F2937] w-full max-w-md p-6 text-xl flex flex-col items-center rounded-lg shadow-lg">
        <div className="text-2xl font-bold mb-2">Welcome Back to {brand_name}</div>
        <div className="mb-6 text-center">{desc}</div>

        <form action="http://20.120.176.155/auth/login" method="POST" className="flex flex-col w-full gap-4 text-white font-mono">
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
              className="border rounded p-2 "
              required
            />
          </div>

          <input
            type="submit"
            value="Login"
            className="bg-blue-600 text-white font-mono rounded py-2 mt-2 hover:bg-blue-700 cursor-pointer"
          />
        </form>
        <div className='p-4 text-lg'>Don&apos; have an account? <Link className='text-blue-500 hover:text-blue-400'  href="/authenticate/signup">Sign up here</Link> </div>
        <div className='text-lg'>OR</div>
        <div className='text-lg p-4'>Continue with Google</div>
        <Link href={""} className='border solid w-max p-2 text-4xl   hover:text-amber-800 font-bold'>Google</Link>

      </div>
    </div>
  );
}

export default Login;
