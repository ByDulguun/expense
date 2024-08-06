import { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useFormik } from "formik";
import classNames from "classnames";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";

const AddCategory = () => {
  const [accounts, setAccounts] = useState([]);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");

  const createAccount = async () => {
    const newAccount = {
      title,
      icon,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/accounts",
        newAccount
      );
      setAccounts([...accounts, response.data]);
    } catch (error) {
      console.error(error);
    }
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
  //
  const formik = useFormik({
    initialValues: {
      icon: "",
      name: "",
    },
    onSubmit: (values) => {
      alert(`Category Created! ${formik.values.icon} ${formik.values.name}`);
    },
    validate: (values) => {
      let errors = {};

      if (!values.icon) {
        errors.icon = "Icon oruulna uu!";
      }
      if (!values.name) {
        errors.name = "Name oruulna uu!";
      }
      return errors;
    },
  });
  const colors = [
    "fill-blue-500",
    "fill-blue-300",
    "fill-green-500",
    "fill-green-300",
    "fill-orange-500",
    "fill-purple-500",
    "fill-red-500",
  ];
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const iconValues = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <div className="bg-[#FFFFFF] w-[450px] h-fit m-auto my-[260px] rounded-xl">
      <p className="py-5 px-6 border-b-[1px] border-[#D1D5DB]">Add Category</p>
      <form>
        {/* onSubmit={formik.handleSubmit} */}
        <div
          className={` gap-[32px] px-6 py-5 h-fit grid 
           `}
        >
          <div className="flex gap-2">
            <div className="flex-1">
              <Select onValueChange={(value) => setIcon(value)}>
                <SelectTrigger className="border border-[#D1D5DB] rounded-[8px]">
                  <SelectValue placeholder="icon" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#D1D5DB] rounded-[8px] grid grid-cols-3">
                  <div className="h-fit">
                    <div className="grid grid-cols-6 gap-2 p-2">
                      {iconValues.map((value) => (
                        <SelectItem key={value} value={value.toString()}>
                          <FaHouseChimneyWindow
                            className={classNames(
                              "cursor-pointer w-6 h-6",
                              selectedColor
                            )}
                          />
                        </SelectItem>
                      ))}
                    </div>
                    <div className="border-t-[1px] border-[#D1d5db]">
                      <div className="flex gap-4 mx-16 my-4">
                        {colors.map((color, index) => (
                          <FaCircle
                            key={index}
                            className={`w-6 h-6 ${color} rounded-full cursor-pointer`}
                            onClick={() => handleColorClick(color)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </SelectContent>
              </Select>

              {formik.errors.icon ? (
                <p className="text-red-500">{formik.errors.icon} </p>
              ) : null}
            </div>

            <div
              className="w-full"
              value={formik.values.icon}
              onChange={formik.handleChange}
            >
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                placeholder="name"
                className="outline-none py-2 border border-[#D1D5DB] rounded-[8px] px-4 w-full"
              />
              {formik.errors.name ? (
                <p className="text-red-500">{formik.errors.name} </p>
              ) : null}
            </div>
          </div>

          <Button
            className="bg-[#16A34A] hover:bg-green-500 rounded-[20px] text-white"
            onClick={createAccount}
            type="submit"
          >
            <p>Add Category</p>
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddCategory;
