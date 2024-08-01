"use client";

import { PlusIcon } from "@/assets/icon/PlusIcon";
import { HeaderLogo } from "../assets/icon/HeaderLogo";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RecordAdd from "./RecordAdd";
import { useState } from "react";

export const Header = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const paths = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Records",
      path: "/records",
    },
  ];
  return (
    <div className="flex w-screen  py-4 bg-white ">
      <div className="w-[1440px] m-auto flex justify-between  ">
        <div className="flex w-[226px] gap-6 align-baseline ">
          <HeaderLogo />
          {paths.map((path, index) => (
            <Link key={index} href={path.path}>
              <div
                className="text-[#0F172A] font-normal"
                style={{
                  fontWeight: pathname === path.path ? "600" : "400",
                }}
              >
                {path.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex gap-6 px-12">
          <Button
            className="bg-[#0166FF] text-white w-fit flex gap-1 rounded-[20px] text-[16px] hover:bg-blue-400 "
            onClick={() => setOpen(!open)}
          >
            <PlusIcon /> Record
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <RecordAdd open={open} setOpen={setOpen} />
    </div>
  );
};
