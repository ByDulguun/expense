import { useContext, useEffect, useState } from "react";
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
import { FaCircle } from "react-icons/fa";
import * as Icons from "react-icons/pi";
import { Context } from "./utils/context";

const AddCategory = ({ setOpenAdd, openAdd, userId }) => {
  const { records, setRecords, getData } = useContext(Context);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");

  const createRecord = async () => {
    const newRecord = {
      title,
      icon,
      iconColor,
      userId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/records",
        newRecord,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setOpenAdd(true);
      getData();
      setRecords([...records, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/records", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        setRecords(response.data);
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
    "#0166FF",
    "#01B3FF",
    "#41CC00",
    "#F9D100",
    "#FF7B01",
    "#AE01FF",
    "#FF0101",
  ];
  const [iconColor, setIconColor] = useState("");

  const handleColorClick = (color) => {
    setIconColor(color);
  };
  const hardDataIcons = [
    { iconName: "PiHouseFill" },
    { iconName: "PiHouseLineFill" },
    { iconName: "PiIdentificationBadgeFill" },
    { iconName: "PiIdentificationCardFill" },
    { iconName: "PiLadderFill" },
    { iconName: "PiIntersectSquareFill" },
    { iconName: "PiImageSquareFill" },
    { iconName: "PiMagnifyingGlassPlusFill" },
    { iconName: "PiMicrophoneFill" },
    { iconName: "PiMicrosoftExcelLogoFill" },
    { iconName: "PiNotepadFill" },
    { iconName: "PiListPlusFill" },
    { iconName: "PiLeafFill" },
    { iconName: "PiNumberFiveFill" },
    { iconName: "PiNumberCircleSevenFill" },
    { iconName: "PiRoadHorizonFill" },
    { iconName: "PiHourglassSimpleMediumFill" },
    { iconName: "PiAnchorSimpleFill" },
    { iconName: "PiBezierCurveFill" },
    { iconName: "PiExcludeFill" },
    { iconName: "PiVignetteFill" },
    { iconName: "PiBaseballFill" },
    { iconName: "PiQuestionFill" },
    { iconName: "PiExamFill" },
    { iconName: "PiWatchFill" },
    { iconName: "PiGlobeSimpleFill" },
    { iconName: "PiOrangeSliceFill" },
    { iconName: "PiPeaceFill" },
    { iconName: "PiToiletPaperFill" },
    { iconName: "PiPencilFill" },
  ];

  return (
    <div className="bg-[#FFFFFF] w-[450px] h-fit m-auto   rounded-xl">
      <p className="py-5 px-6 border-b-[1px] border-[#D1D5DB]">Add Category</p>
      <div className=" gap-[32px] px-6 py-5 h-fit grid ">
        <div className="flex gap-2">
          <div className="flex-1">
            <Select onValueChange={(value) => setIcon(value)}>
              <SelectTrigger className="border border-[#D1D5DB] rounded-[8px]">
                <SelectValue placeholder="icon" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#D1D5DB] rounded-[8px] grid grid-cols-3">
                <div className="h-fit">
                  <div className="grid grid-cols-6 p-4">
                    {hardDataIcons.map((el) => {
                      const IconComponent = Icons[el.iconName];
                      return (
                        <SelectItem key={el} value={el.iconName}>
                          <IconComponent
                            color={iconColor}
                            className={classNames("cursor-pointer w-6 h-6 ")}
                          />
                        </SelectItem>
                      );
                    })}
                  </div>
                  <div className="border-t-[1px] border-[#D1d5db]">
                    <div className="flex gap-4 mx-16 my-4">
                      {colors.map((color, index) => (
                        <FaCircle
                          key={index}
                          color={color}
                          className={`w-6 h-6 rounded-full cursor-pointer`}
                          onClick={() => handleColorClick(color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SelectContent>
            </Select>

            {/* {formik.errors.icon ? (
              <p className="text-red-500">{formik.errors.icon} </p>
            ) : null} */}
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
            {/* {formik.errors.name ? (
              <p className="text-red-500">{formik.errors.name} </p>
            ) : null} */}
          </div>
        </div>

        <Button
          className="bg-[#16A34A] hover:bg-green-500 rounded-[20px] text-white"
          onClick={createRecord}
          type="submit"
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
        >
          <p>Add Category</p>
        </Button>
      </div>
    </div>
  );
};
export default AddCategory;
