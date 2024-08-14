"use client";

import { HeaderLogo } from "@/assets/icon/HeaderLogo";
import { Button } from "./ui/button";
import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import { useAuth } from "./utils/AuthProvider";

const Login = () => {
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit: (values) => {
  //     // alert(`hello ${formik.values.email} ${formik.values.password}`);
  //     console.log("first message ", formik.values);
  //   },
  //   validate: (values) => {
  //     let errors = {};

  //     if (!values.email) {
  //       errors.email = "Email oruulna uu!";
  //     }
  //     if (!values.password) {
  //       errors.password = "Password oruulna uu!";
  //     }
  //     return errors;
  //   },
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  return (
    <div className="w-screen  h-screen ">
      <div className="w-[1440px] shadow-2xl  m-auto flex my-[80px] ">
        <div className="w-screen flex-1 my-[300px] h-fit grid gap-10 ">
          <div className="flex font-semibold text-[18px] justify-center ">
            <HeaderLogo /> <p>Geld</p>
          </div>
          <div className="text-center">
            <h1 className="text-[24px] font-semibold">Welcome Back</h1>
            <p className="text-[#334155]">
              Welcome back, Please enter your details
            </p>
          </div>
          <div>
            <form
              className="h-fit grid gap-4 justify-center"
              // onSubmit={formik.handleSubmit}
            >
              <input
                type="email"
                placeholder="Email"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {/* {formik.errors.email ? (
                <p className="text-red-500">{formik.errors.email}</p>
              ) : null} */}
              <input
                type="password"
                placeholder="Password"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {/* {formik.errors.password ? (
                <p className="text-red-500">{formik.errors.password}</p>
              ) : null} */}
              {/* <Link href={`/geldwait`}> */}
              <Button
                type="submit"
                className="bg-[#0166FF] w-full hover:bg-blue-500 text-white rounded-[20px] h-12"
                onClick={() => login(email, password)}
              >
                Log in
              </Button>
              {/* </Link> */}
            </form>
          </div>
          <div className="flex justify-center">
            <p>{`Don’t have account?`}</p>
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
