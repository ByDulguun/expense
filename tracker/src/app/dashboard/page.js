"use client";

import { GeldIcon } from "@/assets/icon/GeldIcon";
import { LeadingDown } from "@/assets/icon/LeadingDown";
import { LeadingIcon } from "@/assets/icon/LeadingIcon";
import { Shape } from "@/assets/icon/Shape";
import { ShapeLogo } from "@/assets/icon/ShapeLogo";
import { DonutChart } from "@/components/Charts/DonutChart";
import { Header } from "@/components/Header";
import { IncomeExpenseChart } from "@/components/Charts/IncomeExpenseChart";
import { useContext } from "react";
import { CategoryContext } from "@/components/utils/CategoryContext";
import { RecordContext } from "@/components/utils/recordContext";

const dashboard = () => {
  const { categories } = useContext(CategoryContext);
  const { renderIcon, formattedDate } = useContext(RecordContext);
  const last5Categories = categories
    .slice(-5) // Get the last 5 elements
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <Header />
      <div className="w-screen h-screen bg-[#F3F4F6] ">
        <div className="w-[1440px] m-auto py-12 ">
          <div className="flex gap-4  ">
            <div className=" flex-1 h-[220px] bg-[#0166FF] relative rounded-[18px]">
              <div className=" absolute right-0 bottom-0">
                <Shape />
              </div>
              <div className="absolute right-[32px] bottom-[32px]">
                <ShapeLogo />
              </div>
              <div>
                <div className="flex font-semibold text-[18px] text-white align-baseline absolute items-center gap-5  top-6 left-6 ">
                  <GeldIcon /> <p>Geld</p>
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-[16px] opacity-50 text-white">Cash</p>
                  <p className="text-2xl font-semibold text-white">10,000,00</p>
                </div>
              </div>
            </div>
            <div className="flex-1 h-fit bg-white rounded-xl">
              <div className="flex items-baseline gap-2 py-4 px-6 border-b-[1px] border-[#E2E8F0]">
                <div className="w-[8px] h-[8px] bg-[#84CC16] rounded-xl"></div>
                <p className="font-semibold">Your Income</p>
              </div>
              <div className="p-6 grid h-fit gap-4">
                <div>
                  <div className="flex">
                    <p className="text-[36px] font-semibold">1,200,000 </p>
                    <p className="text-[36px] font-semibold">₮</p>
                  </div>
                  <p>Your Income Amount</p>
                </div>

                <div className="flex">
                  <div>
                    <LeadingIcon />
                  </div>
                  <p>32% from last month</p>
                </div>
              </div>
            </div>
            <div className="flex-1 h-fit bg-white rounded-xl">
              <div className="flex items-baseline gap-2 py-4 px-6 border-b-[1px] border-[#E2E8F0]">
                <div className="w-[8px] h-[8px] bg-[#0166FF] rounded-xl"></div>
                <p className="font-semibold">Your Income</p>
              </div>
              <div className="p-6 grid h-fit gap-4">
                <div>
                  <div className="flex">
                    <p className="text-[36px] font-semibold">-1,200,000 </p>
                    <p className="text-[36px] font-semibold">₮</p>
                  </div>
                  <p>Your Income Amount</p>
                </div>

                <div className="flex">
                  <div>
                    <LeadingDown />
                  </div>
                  <p>32% from last month</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8 my-8">
            <div className="flex-1 border bg-white rounded-xl">
              <p className="text-[16px] font-semibold px-6 py-4 border-b-[1px] border-[#E2E8F0]">
                Income - Expense
              </p>
              <div className="flex px-6">
                <IncomeExpenseChart />
              </div>
            </div>
            <div className="flex-1  bg-white rounded-xl">
              <p className="text-[16px] font-semibold px-6 py-4 border-b-[1px] border-[#E2E8F0]">
                Income - Expense
              </p>
              <div>
                <DonutChart />
              </div>
            </div>
          </div>
          <div className=" bg-[#FFFFFF] border border-[#E2E8F0] rounded-[8px] ">
            <div className="border-b-[1px] px-6 py-4">
              <p className="text-[#0F172A] text-lg font-semibold ">
                last record
              </p>
            </div>
            <div>
              {last5Categories.map((el) => {
                return (
                  <div className="flex justify-between mx-4 items-center border-b-2">
                    <div className="flex relative items-center">
                      <div className="relative">{renderIcon(el.category)}</div>
                      <div>
                        <div className="mx-6 absolute top-10 left-8 text-[12px] text-[#6B7280] flex gap-2">
                          <p className=" w-fit flex">{el.time}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${
                        el.status === "income"
                          ? "text-[#23E01F]"
                          : "text-[#F54949]"
                      }`}
                    >
                      <p>
                        {el.status === "income"
                          ? `+ ${el.amount}`
                          : `- ${el.amount}`}
                        ₮
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default dashboard;
