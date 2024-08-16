"use client";

import { HeaderLogo } from "@/assets/icon/HeaderLogo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/utils/AuthProvider";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  return (
    <div className="w-screen h-screen">
      <div className="w-[1440px] shadow-2xl m-auto flex my-[80px]">
        <div className="w-screen flex-1 my-[200px] h-fit grid gap-10">
          <div className="flex font-semibold text-[18px] justify-center">
            <HeaderLogo /> <p>Geld</p>
          </div>
          <div className="text-center">
            <h1 className="text-[24px] font-semibold">Create Geld account</h1>
            <p className="text-[#334155]">
              Sign up below to create your Wallet account
            </p>
          </div>
          <div>
            <div className="h-fit grid gap-4 justify-center">
              <input
                type="text"
                placeholder="Name"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-Password"
                  className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>

              <Button
                className="bg-[#0166FF] w-full hover:bg-blue-500 text-white rounded-[20px] h-12"
                onClick={() => register(username, email, password)}
              >
                Sign Up
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <p>{`Already have an account?`}</p>
            <Link href={`/`}>
              <button className="text-[#0166FF] hover:text-blue-400">
                Log in
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-[#0166FF] overflow-hidden"></div>
      </div>
    </div>
  );
};

export default Signup;
