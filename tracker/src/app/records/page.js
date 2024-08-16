"use client";

import { ChevronLeft } from "@/assets/icon/ChevronLeft";
import { ChevronRight } from "@/assets/icon/ChevronRight";
import { PlusIcon } from "@/assets/icon/PlusIcon";
import { PlusIconBlue } from "@/assets/icon/PlusIconBlue";
import { Header } from "@/components/Header";
import RecordAdd from "@/components/RecordAdd";
import RecordsCategory from "@/components/RecordsCategory";
import { Today } from "@/components/Today";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { IoEyeOff } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

const records = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);
  const [selectedIconCategoryId, setSelectedIconCategoryId] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [visibleEye, setVisibleEye] = useState(null);

  const deleteAccount = async () => {
    if (selectedAccountId) {
      await axios.delete(
        `http://localhost:5000/accounts/${selectedAccountId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setAccounts(
        accounts.filter((account) => account.id !== selectedAccountId)
      );
      setSelectedAccountId(null);
    }
  };

  const deleteIconCategory = async () => {
    if (selectedIconCategoryId) {
      await axios.delete(
        `http://localhost:5000/iconcategories/${selectedIconCategoryId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setCategories(
        categories.filter((category) => category.id !== selectedIconCategoryId)
      );
      setSelectedIconCategoryId(null);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/accounts", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setAccounts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/iconcategories`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);
  const renderIcon = (recordCategoryId) => {
    const account = accounts?.find((el) => el.id === recordCategoryId);

    if (account) {
      return (
        <div className="flex gap-2 relative mx-2 my-2">
          <p className="text-lg font-normal">{account.title}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-screen bg-[#F3F4F6] ">
      <Header />
      <div className="flex   w-[1440px] m-auto py-12 ">
        <div className="py-6 px-4 flex-none grid h-fit gap-6 bg-white border border-[#E5E7EB] rounded-xl ">
          <div className="h-fit grid gap-6 ">
            <h1 className="text-2xl font-semibold ">Records</h1>

            <div onClick={() => setOpen(!open)}>
              <Button className="bg-[#0166FF] text-white w-fit flex gap-1 rounded-[20px] text-[16px] hover:bg-blue-400  px-28 ">
                <PlusIcon /> Add
              </Button>
            </div>
          </div>
          <div className="text-[#A3A3A3] w-fit h-fit  py-1 border rounded-xl bg-[#F3F4F6]">
            <input
              className="mx-12 bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
              type="search"
              placeholder="Search"
            ></input>
          </div>
          <div className="h-fit grid ">
            <div>
              <h1 className="text-[16px] font-semibold  py-4">Types</h1>
            </div>

            <div className="px-4  ">
              <RadioGroup
                defaultValue="all h-fit grid gap-6 "
                value={filterType}
                onValueChange={(value) => setFilterType(value)}
              >
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="all" id="all" />
                  <label htmlFor="all" className="leading-6">
                    All
                  </label>
                </div>
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="income" id="income" />
                  <label htmlFor="income" className="leading-6">
                    Income
                  </label>
                </div>
                <div
                  className={`flex items-center space-x-2 
                  `}
                >
                  <RadioGroupItem value="expense" id="expense" />
                  <label htmlFor="expense" className="leading-6">
                    Expense
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div>
            <div className="flex justify-between my-4 ">
              <p className="text-[16px] font-semibold ">Category</p>
              <p
                className="opacity-20 cursor-pointer"
                onClick={() => setVisibleEye(!visibleEye)}
              >
                Clear
              </p>
            </div>

            <div className="px-1 ">
              <div className="gap-2 mx-1 grid  h-fit overflow-scroll">
                <ul>
                  {accounts.map((account, index) => {
                    return (
                      <div
                        key={account.title + index}
                        className="flex justify-between items-baseline align-baseline h-fit"
                        onClick={() => setVisibleEye(!visibleEye)}
                      >
                        <div className="flex gap-2 ">
                          <div className=" cursor-pointer" key={index}>
                            {visibleEye ? (
                              <IoEyeOff size={24} />
                            ) : (
                              <IoMdEye size={24} />
                            )}
                          </div>
                          <p>{account.title}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-none"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      // <li key={account.title + index}>
                      //   {account.title} {account.amount}
                      // </li>
                    );
                  })}
                  {/* {categories?.map((el, category, index) => {
                    return (
                      <div
                        key={category.title + index}
                        className="flex justify-between  align-baseline h-fit "
                        onClick={() => setSelectedIconCategoryId(category.id)}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            selectedIconCategoryId === category.id
                              ? "#f0f0f0"
                              : "white",
                        }}
                      >
                        <div className="flex gap-2 items-center">
                          <div>
                            <SeeIcon />
                          </div>
                          <div>{renderIcon(el.category)}</div>
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-none"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })} */}
                </ul>
              </div>
              <div className="flex" onClick={() => setOpenAdd(!openAdd)}>
                <PlusIconBlue />
                <p>Add Category</p>
              </div>
            </div>
          </div>
          <div className="h-fit grid gap-4">
            <p className=" text-[16px] font-semibold">Amount range</p>
            <div className="h-fit grid gap-6">
              <div className="flex w-[280px] gap-4  ">
                <div className="flex-1 ">
                  <Input className="rounded-[8px]" type="0" />
                </div>
                <div className="flex-1">
                  <Input className="rounded-[8px] text-black" type="100" />
                </div>
              </div>
              <div>
                <Slider
                  defaultValue={[33]}
                  max={100}
                  step={1}
                  className="bg-[#0166FF] border-[#0166FF]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" mx-12 flex-1 ">
          <div className="flex items-baseline justify-between">
            <div className="flex gap-3 my-2">
              <button className=" bg-[#E5E7EB] rounded-[8px]">
                <ChevronLeft />
              </button>
              <p>Last 30 Days</p>
              <button className=" bg-[#E5E7EB] rounded-[8px]">
                <ChevronRight />
              </button>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[180px] bg-white rounded-xl border border-[#D1D5DB]">
                  <SelectValue placeholder="Newest first" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Today
              filterType={filterType}
              setVisibleEye={setVisibleEye}
              visibleEye={visibleEye}
            />
          </div>
        </div>
      </div>
      <RecordsCategory openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <RecordAdd open={open} setOpen={setOpen} setCategories={setCategories} />
    </div>
  );
};

export default records;
