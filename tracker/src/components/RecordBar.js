"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AddCategory } from "@/assets/icon/AddCategory";
import { Home } from "@/assets/icon/Home";
import { Gift } from "@/assets/icon/Gift";
import { Food } from "@/assets/icon/Food";
import { Drink } from "@/assets/icon/Drink";
import { Taxi } from "@/assets/icon/Taxi";
import { Shopping } from "@/assets/icon/Shopping";
import * as React from "react";

import RecordsCategory from "./RecordsCategory";
import axios from "axios";
import { useFormik, formik } from "formik";
import { Date } from "./Date";
import { Button } from "./ui/button";

export const RecordBar = () => {
  const [click, setClick] = useState(true);
  const [openAdd, setOpenAdd] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [date, setDate] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/accounts");

        setAccounts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      date: "",
      time: "",
    },
    onSubmit: (values) => {
      alert(
        `hello ${formik.values.amount} ${formik.values.category} ${formik.values.date} ${formik.values.time} ${formik.values.payee} ${formik.values.note}`
      );
      console.log("first message ", formik.values);
    },
    validate: (values) => {
      let errors = {};

      if (!values.amount) {
        errors.amount = "Amount oruulna uu!";
      }
      if (!values.category) {
        errors.category = "Category oruulna uu!";
      }
      if (!values.date) {
        errors.date = "Date oruulna uu!";
      }
      if (!values.time) {
        errors.time = "Time oruulna uu!";
      }
      if (!values.payee) {
        errors.payee = "Payee bicne uu!";
      }
      if (!values.note) {
        errors.note = "Note bicne uu!";
      }

      return errors;
    },
  });
  return (
    <div className="bg-[#FFFFFF] w-[750px] h-fit m-auto my-[260px] rounded-xl">
      <div className="flex justify-between py-5 px-6 border-b-[1px] border-[#D1D5DB]">
        <div> Add Record</div>
        <div></div>
      </div>
      <div>
        <form className="flex w-full" onSubmit={formik.handleSubmit}>
          <div className="flex-1  px-6 h-fit grid gap-6 my-6">
            <div
              className="flex  rounded-[20px] bg-[#F3F4F6]  relative "
              onClick={() => setClick(!click)}
            >
              <div
                className={` px-14 py-2 rounded-[20px] z-10 cursor-pointer ${
                  click ? "text-white " : "text-black"
                }  `}
              >
                Expense
              </div>
              <div
                className={`absolute w-1/2  h-full rounded-full top-0 transition-transform duration-1000   ${
                  click
                    ? "bg-[#0166FF] translate-x-0 "
                    : "bg-[#16A34A] translate-x-full"
                }  `}
                style={{}}
              ></div>

              <div
                className={` px-14 py-2 rounded-[20px] z-10 cursor-pointer ${
                  click ? "text-black" : "text-white "
                }  `}
              >
                Income
              </div>
            </div>

            <div class="w-full  border border-[#D1D5DB] rounded-[8px]">
              <label
                for="money"
                class="block text-sm font-medium text-gray-700  relative top-1 left-3"
              >
                Amount
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  ₮
                </span>
                <input
                  type="number"
                  id="money"
                  name="amount"
                  placeholder="000.00"
                  className="pl-7 pr-3 py-2 text-[#9CA3AF]     w-full outline-none"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            {formik.errors.amount ? (
              <p className="text-red-500">{formik.errors.amount}</p>
            ) : null}

            <div className="grid h-fit gap-2">
              <p>Category</p>
              <Select>
                <SelectTrigger className="w-full border border-[#D1D5DB] rounded-[8px]">
                  <SelectValue
                    placeholder={`${
                      click ? "Choose" : "  Find or choose category"
                    }`}
                    onClick={() => setClick(!click)}
                  />
                </SelectTrigger>
                <SelectContent className="bg-white   border border-[#D1D5DB] rounded-[8px]">
                  <button className="border-b-[1px] border-[#D1D5DB] w-full p-4">
                    <div
                      className="flex align-baseline gap-2  "
                      onClick={() => setOpenAdd(!openAdd)}
                    >
                      <div>
                        <AddCategory />
                      </div>
                      <p>Add Category</p>
                    </div>
                  </button>
                  <div
                    value={(accounts.title, formik.values.amount)}
                    className="flex gap-2 py-1 "
                    onChange={formik.handleChange}
                  >
                    {accounts.map((account, index) => {
                      <div key={account.title + index}>
                        return <p className="text-black">{account.title}</p>;
                      </div>;
                    })}
                  </div>
                  <SelectItem value="Shopping">
                    <div className="flex gap-2 py-1 ">
                      <div>
                        <Home />
                      </div>
                      <p>Home</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="Transportation">
                    <div className="flex gap-2 py-1 ">
                      <div>
                        <Gift />
                      </div>
                      <p>Gift</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="Vehicle">
                    <div className="flex gap-2 py-1 ">
                      <div>
                        <Food />
                      </div>
                      <p>Food</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="Life & Entertainment">
                    <div className="flex gap-2 py-1 ">
                      <div>
                        <Drink />
                      </div>
                      <p>Drink</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="Communication, PC">
                    <div className="flex gap-2 py-1 ">
                      <div>
                        <Taxi />
                      </div>
                      <p>Taxi</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="Financial expenses">
                    <div className="flex gap-2 py-1 ">
                      <div>
                        <Shopping />
                      </div>
                      <p>Shopping</p>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {formik.errors.category ? (
                <p className="text-red-500">{formik.errors.category} </p>
              ) : null}
            </div>
            <div className="flex w-full gap-4">
              <div className="flex-1 grid h-fit gap-2 ">
                <p>Date</p>
                <Date
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                />
                {formik.errors.date ? (
                  <p className="text-red-500">{formik.errors.date}</p>
                ) : null}
              </div>
              <div className="flex-1  ">
                <div class="w-full grid h-fit gap-2 ">
                  <label for="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    class="pl-3 pr-3 py-1.5 border border-[#D1D5DB]  rounded-[8px] outline-none w-full bg-white"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.time ? (
                    <p className="text-red-500">{formik.errors.time}</p>
                  ) : null}
                </div>
              </div>
            </div>
            <Button
              className={`bg-[#0166FF] text-white w-full flex gap-1 rounded-[20px] text-[16px] hover:bg-[#0166FF]  px-28  ${
                click ? "bg-[#0166FF] " : "bg-[#16A34A] "
              }`}
              type="submit"
            >
              Add record
            </Button>
          </div>

          <div className="flex-1  w-full border  px-6 grid h-fit gap-8">
            <div className="mt-5 w-full">
              <p className="mb-1">Payee</p>
              <input
                className="border w-full border-[#D1D5DB] rounded-[8px] bg-[#F9FAFB] outline-none py-1 px-4"
                type="text"
                name="payee"
                placeholder="write here"
                value={formik.values.payee}
                onChange={formik.handleChange}
              />
              {formik.errors.payee ? (
                <p className="text-red-500">{formik.errors.payee}</p>
              ) : null}
            </div>
            <div>
              <p className="mb-1">Note</p>
              <input
                type="text"
                placeholder="Write here"
                className="border w-full pb-[240px] pt-2 mb-6 pl-2 border-[#D1D5DB] rounded-[8px] bg-[#F9FAFB] outline-none"
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
              />
              {formik.errors.note ? (
                <p className="text-red-500">{formik.errors.note}</p>
              ) : null}
            </div>
          </div>
        </form>
      </div>

      <RecordsCategory openAdd={openAdd} setOpenAdd={setOpenAdd} />
    </div>
  );
};
