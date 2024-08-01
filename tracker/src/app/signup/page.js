"use client";
import { HeaderLogo } from "@/assets/icon/HeaderLogo";

import { Button } from "@/components/ui/button";
import { useFormik, Formik } from "formik";
import Link from "next/link";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
    },
    onSubmit: (values) => {
      alert(`hello ${formik.values.email} ${formik.values.password}`);
      console.log("first message ", formik.values);
    },
    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Name oruulna uu!";
      }
      if (!values.email) {
        errors.email = "Email oruulna uu!";
      }
      if (!values.password) {
        errors.password = "Password oruulna uu!";
      }
      if (!values.repassword) {
        errors.repassword = "Re-Password oruulna uu!";
      }

      return errors;
    },
  });
  return (
    <div className="w-screen  h-screen ">
      <div className="w-[1440px] shadow-2xl  m-auto flex my-[80px] ">
        <div className="w-screen flex-1 my-[200px] h-fit grid gap-10 ">
          <div className="flex font-semibold text-[18px] justify-center ">
            <HeaderLogo /> <p>Geld</p>
          </div>
          <div className="text-center">
            <h1 className="text-[24px] font-semibold">Create Geld account</h1>
            <p className="text-[#334155]">
              Sign up below to create your Wallet account
            </p>
          </div>
          <div className="">
            <form
              onSubmit={formik.handleSubmit}
              className="h-fit grid gap-4 justify-center"
            >
              <input
                type="name"
                placeholder="Name"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name ? (
                <p className="text-red-500">{formik.errors.name}</p>
              ) : null}

              <input
                type="email"
                placeholder="Email"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <p className="text-red-500">{formik.errors.email}</p>
              ) : null}
              <input
                type="password"
                placeholder="Password"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <p className="text-red-500">{formik.errors.password}</p>
              ) : null}
              <input
                type="password"
                placeholder="Re-Password"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                value={formik.values.repassword}
                onChange={formik.handleChange}
              />
              {formik.errors.repassword ? (
                <p className="text-red-500">{formik.errors.repassword}</p>
              ) : null}
              <Link href={`/`}>
                <Button
                  className="bg-[#0166FF] w-full hover:bg-blue-500 text-white rounded-[20px] h-12"
                  type="submit"
                >
                  Log in
                </Button>
              </Link>
            </form>
          </div>
          <div className="flex justify-center">
            <p>{`Already have account?`}</p>
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
