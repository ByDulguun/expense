"use client";

import { HeaderLogo } from "@/assets/icon/HeaderLogo";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./utils/AuthProvider";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const { login } = useAuth();

  return (
    <div className="w-screen h-screen">
      <div className="w-[1440px] shadow-2xl m-auto flex my-[80px]">
        <div className="w-screen flex-1 my-[300px] h-fit grid gap-10">
          <div className="flex font-semibold text-[18px] justify-center">
            <HeaderLogo /> <p>Geld</p>
          </div>
          <div className="text-center">
            <h1 className="text-[24px] font-semibold">Welcome Back</h1>
            <p className="text-[#334155]">
              Welcome back, Please enter your details
            </p>
          </div>
          <div>
            <div className="h-fit grid gap-4 justify-center">
              <input
                type="email"
                placeholder="Email"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder="Password"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none relative"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
              <Button
                type="submit"
                className="bg-[#0166FF] w-full hover:bg-blue-500 text-white rounded-[20px] h-12"
                onClick={() => login(email, password)}
              >
                Log in
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <p>{`Don’t have an account?`}</p>
            <Link href={`/signup`}>
              <button className="text-[#0166FF] hover:text-blue-400">
                Sign up
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-[#0166FF] overflow-hidden"></div>
      </div>
    </div>
  );
};

export default Login;
