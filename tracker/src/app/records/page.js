"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft } from "@/assets/icon/ChevronLeft";
import { ChevronRight } from "@/assets/icon/ChevronRight";
import { PlusIcon } from "@/assets/icon/PlusIcon";
import { PlusIconBlue } from "@/assets/icon/PlusIconBlue";
import { Header } from "@/components/Header";
import RecordsCategory from "@/components/RecordsCategory";
import { Today } from "@/components/Today";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { RecordAdd } from "@/components/RecordAdd";

const Records = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(true);
  const [records, setRecords] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);
  const [selectedIconCategoryId, setSelectedIconCategoryId] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [visibleEye, setVisibleEye] = useState(null); // Store accountId here

  const deleteRecord = async () => {
    if (selectedRecordId) {
      await axios.delete(`http://localhost:5000/records/${selectedRecordId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setRecords(records.filter((record) => record.id !== selectedRecordId));
      setSelectedRecordId(null);
    }
  }; //Сервер рүү УСТГАХ хүсэлтийг ашиглан бүртгэлийг ID-аар нь устгана.
  //Амжилттай устгасны дараа устгасан бичлэгийг устгахын тулд бичлэгийн төлөвийг шинэчилж, сонгосонRecordId-г дахин тохируулна.

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
  }; //Энэхүү useEffect дэгээ нь бүрэлдэхүүн хэсэг холбогдож, GET хүсэлтийг ашиглан серверээс бичлэгийн жагсаалтыг авч, бичлэгийн төлөвийг тохируулах үед ажилладаг.

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/records", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setRecords(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []); //Энэхүү useEffect дэгээ нь бүрэлдэхүүн хэсэг холбогдож, GET хүсэлтийг ашиглан дүрс ангиллын жагсаалтыг серверээс авч, ангиллын төлөвийг тохируулах үед ажилладаг.

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/iconcategories",
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
    const record = records?.find((el) => el.id === recordCategoryId);
    if (record) {
      return (
        <div className="flex gap-2 relative mx-2 my-2">
          <p className="text-lg font-normal">{record.title}</p>
        </div>
      );
    }
    return null;
  }; //Энэ функц нь recordCategoryId-г аргумент болгон авч, бичлэгийн массиваас харгалзах бичлэгийг олж, бичлэгийн гарчгийг харуулсан JSX элементийг буцаана. Хэрэв бичлэг олдохгүй бол энэ нь null утгыг буцаана.

  return (
    <div className="w-screen bg-[#F3F4F6] ">
      <Header />
      <div className="flex w-[1440px] m-auto py-12 ">
        <div className="py-6 px-4 flex-none grid h-fit gap-6 bg-white border border-[#E5E7EB] rounded-xl ">
          <div className="h-fit grid gap-6 ">
            <h1 className="text-2xl font-semibold ">Records</h1>
            <div onClick={() => setOpen(!open)}>
              <Button className="bg-[#0166FF] text-white w-fit flex gap-1 rounded-[20px] text-[16px] hover:bg-blue-400 px-28 ">
                <PlusIcon /> Add
              </Button>
            </div>
          </div>
          <div className="text-[#A3A3A3] w-fit h-fit py-1 border rounded-xl bg-[#F3F4F6]">
            <input
              className="mx-12 bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
              type="search"
              placeholder="Search"
            />
          </div>
          <div className="h-fit grid ">
            <div>
              <h1 className="text-[16px] font-semibold py-4">Types</h1>
            </div>
            <div className="px-4">
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
                <div className="flex items-center space-x-2">
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
                onClick={() => setVisibleEye(null)}
              >
                Clear
              </p>
            </div>
            <div className="px-1">
              <div className="gap-2 mx-1 grid h-fit overflow-scroll">
                <ul>
                  {records.map((record, index) => (
                    <div
                      key={record.title + index}
                      className="flex justify-between items-baseline align-baseline h-fit"
                      onClick={() => setVisibleEye(record.id)}
                    >
                      <div className="flex gap-2 ">
                        <div className="cursor-pointer">
                          {visibleEye === record.id ? (
                            <IoMdEye size={24} />
                          ) : (
                            <IoEyeOff size={24} />
                          )}
                        </div>
                        <p>{record.title}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-none"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </ul>
              </div>
              <div
                className="flex cursor-pointer"
                onClick={() => setOpenAdd(!openAdd)}
              >
                <PlusIconBlue />
                <p>Add Category</p>
              </div>
            </div>
          </div>
          <div className="h-fit grid gap-4">
            <p className="text-[16px] font-semibold">Amount range</p>
            <div className="h-fit grid gap-6">
              <div className="flex w-[280px] gap-4">
                <div className="flex-1">
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
        <div className="mx-12 flex-1 ">
          <div className="flex items-baseline justify-between">
            <div className="flex gap-3 my-2">
              <button className="bg-[#E5E7EB] rounded-[8px]">
                <ChevronLeft />
              </button>
              <p>Last 30 Days</p>
              <button className="bg-[#E5E7EB] rounded-[8px]">
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
            <Today filterType={filterType} visibleEye={visibleEye} />
          </div>
        </div>
      </div>
      <RecordsCategory openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <RecordAdd open={open} setOpen={setOpen} setCategories={setCategories} />
    </div>
  );
};

export default Records;
