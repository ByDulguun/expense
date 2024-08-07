"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AddCategory } from "@/assets/icon/AddCategory";

import * as React from "react";

import RecordsCategory from "./RecordsCategory";
import axios from "axios";
import { Date } from "./Date";
import { Button } from "./ui/button";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import * as Icons from "react-icons/ai";

export const RecordBar = () => {
  const [click, setClick] = useState(true);
  const [openAdd, setOpenAdd] = useState(true);
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState([]);
  const [category, setCategory] = useState({});
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [payee, setPayee] = useState([]);
  const [note, setNote] = useState([]);
  const [icon, setIcon] = useState([]);

  // const formik = useFormik({
  //   initialValues: {
  //     amount: "",
  //     date: "",
  //     time: "",
  //   },
  //   // onSubmit: (values) => {
  //   //   alert(
  //   //     `hello ${formik.values.amount} ${formik.values.category} ${formik.values.date} ${formik.values.time} ${formik.values.payee} ${formik.values.note}`
  //   //   );
  //   //   console.log("first message ", formik.values);
  //   // },
  //   // validate: (values) => {
  //   //   let errors = {};

  //   //   if (!values.amount) {
  //   //     errors.amount = "Amount oruulna uu!";
  //   //   }
  //   //   if (!values.category) {
  //   //     errors.category = "Category oruulna uu!";
  //   //   }
  //   //   if (!values.date) {
  //   //     errors.date = "Date oruulna uu!";
  //   //   }
  //   //   if (!values.time) {
  //   //     errors.time = "Time oruulna uu!";
  //   //   }
  //   //   if (!values.payee) {
  //   //     errors.payee = "Payee bicne uu!";
  //   //   }
  //   //   if (!values.note) {
  //   //     errors.note = "Note bicne uu!";
  //   //   }

  //   //   return errors;
  //   // },
  // });

  const [title, setTitle] = useState("");

  const newAccount = {
    title,
    icon,
  };
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
  const [accounts, setAccounts] = useState([]);

  const createCategories = async () => {
    const newCategory = {
      amount,
      category,
      date,
      time,
      payee,
      note,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/iconcategories",
        newCategory
      );
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/iconcategories"
        );

        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);
  return (
    <div className="bg-[#FFFFFF] w-[750px] h-fit m-auto my-[260px] rounded-xl">
      <div className="flex justify-between py-5 px-6 border-b-[1px] border-[#D1D5DB]">
        <div> Add Record</div>
        <div></div>
      </div>
      <div>
        <form className="flex flex-wrap w-full">
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
                  className="pl-7 pr-3 py-2 text-[#9CA3AF]  w-full outline-none"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>
            </div>
            {/* {formik.errors.amount ? (
              <p className="text-red-500">{formik.errors.amount}</p>
            ) : null} */}

            <div className="grid h-fit gap-2">
              <p>Category</p>
              <div>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="border border-[#D1D5DB] rounded-[8px]">
                    <SelectValue
                      placeholder={click ? "Choose" : "Find or choose category"}
                      onClick={() => setClick(!click)}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-[#D1D5DB] rounded-[8px]">
                    <SelectGroup>
                      <button
                        className="border-b-[1px] border-[#D1D5DB] w-full p-4 flex items-center"
                        onClick={() => setOpenAdd(!openAdd)}
                      >
                        <AddCategory />
                        <p className="ml-2">Add Category</p>
                      </button>
                      <div></div>
                      <div className="text-black">
                        {accounts.map((account, index) => {
                          const IconComponent = Icons[account.icon];
                          return (
                            <SelectItem
                              key={account.title + index}
                              value={account.id}
                            >
                              <div className="flex items-center text-black">
                                <div>
                                  <IconComponent />
                                </div>
                                <div className="py-2 px-4 border">
                                  {account.title}
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </div>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div
                  // value={formik.values.amount}
                  className="flex gap-2 py-1 "
                  // onChange={formik.handleChange}
                ></div>
              </div>
              {/* {formik.errors.category ? (
                <p className="text-red-500">{formik.errors.category} </p>
              ) : null} */}
            </div>
            <div className="flex w-full gap-4">
              <div
                className="flex-1 grid h-fit gap-2 "
                value={date}
                onChange={(event) => setDate(event.target.value)}
              >
                <p>Date</p>
                <Date
                // value={formik.values.amount}
                // onChange={formik.handleChange}
                />
                {/* {formik.errors.date ? (
                  <p className="text-red-500">{formik.errors.date}</p>
                ) : null} */}
              </div>
              <div className="flex-1  ">
                <div class="w-full grid h-fit gap-2 ">
                  <label for="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    class="pl-3 pr-3 py-1.5 border border-[#D1D5DB]  rounded-[8px] outline-none w-full bg-white text-gray-500"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                  />
                  {/* {formik.errors.time ? (
                    <p className="text-red-500">{formik.errors.time}</p>
                  ) : null} */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1  w-full   px-6 grid h-fit gap-8">
            <div className="mt-5 w-full">
              <p className="mb-1">Payee</p>
              <input
                className="border w-full border-[#D1D5DB] rounded-[8px] bg-[#F9FAFB] outline-none py-1 px-4"
                type="text"
                name="payee"
                placeholder="write here"
                value={payee}
                onChange={(event) => setPayee(event.target.value)}
              />
              {/* {formik.errors.payee ? (
                <p className="text-red-500">{formik.errors.payee}</p>
              ) : null} */}
            </div>
            <div>
              <p className="mb-1">Note</p>
              <input
                type="text"
                placeholder="Write here"
                className="border w-full pb-[240px] pt-2 mb-6 pl-2 border-[#D1D5DB] rounded-[8px] bg-[#F9FAFB] outline-none"
                name="note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
              {/* {formik.errors.note ? (
                <p className="text-red-500">{formik.errors.note}</p>
              ) : null} */}
            </div>
          </div>
          <Button
            className={`bg-[#0166FF] text-white w-fit relative bottom-4 left-12 flex gap-1 rounded-[20px] text-[16px] hover:bg-[#0166FF]  px-28  ${
              click ? "bg-[#0166FF] " : "bg-[#16A34A] "
            }`}
            onClick={createCategories}
          >
            Add record
          </Button>
        </form>
      </div>

      <RecordsCategory openAdd={openAdd} setOpenAdd={setOpenAdd} />
    </div>
  );
};
