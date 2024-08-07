"use client";
import { useState } from "react";
import * as Icons from "react-icons/ai";
export const Today = ({ categories }) => {
  const [accounts, setAccounts] = useState([]);
  return (
    <div>
      <p className="mb-3 font-semibold text-[16px]">Today</p>
      <div className="h-fit grid gap-3">
        {categories.map((item) => {
          return (
            <div
              className="bg-white border border-[#E5E7EB]  rounded-xl px-6 py-3"
              key={item.id}
            >
              <div className="flex gap-3">
                <div className="mt-2">
                  <input type="checkbox" className="w-6 h-6" />
                </div>
                <div className="flex gap-3 w-fit">
                  <div>
                    <div className="flex justify-between w-[1000px] align-baseline">
                      <div className="h-fit grid">
                        {accounts.map((el) => {
                          const IconComponent = Icons[el.iconName];
                          return <IconComponent key={el} value={el.iconName} />;
                        })}
                        <p className="text-black">{item.category}</p>
                        <p className="text-black text-[12px] ">{item.time}</p>
                        <p>{item.payee}</p>
                      </div>
                      <div className="text-[#23E01F] ">
                        <p>{item.amount}₮</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
