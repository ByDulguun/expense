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
import { Context } from "./utils/recordContext";

const AddCategory = ({ setOpenAdd, openAdd, userId }) => {
  const { records, setRecords, getData } = useContext(Context);
  const [iconColor, setIconColor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      icon: "",
      title: "",
    },
    onSubmit: async (values) => {
      const newRecord = {
        ...values,
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
    },
    validate: (values) => {
      let errors = {};

      if (!values.icon) {
        errors.icon = "Icon сонгоно уу!";
      }
      if (!values.title) {
        errors.title = "Нэр бичнэ үү!";
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
    <div className="bg-[#FFFFFF] w-[450px] h-fit m-auto rounded-xl">
      <p className="py-5 px-6 border-b-[1px] border-[#D1D5DB]">Add Category</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="gap-[32px] px-6 py-5 h-fit grid">
          <div className="flex gap-2">
            <div className="flex-1">
              <Select
                onValueChange={(value) => formik.setFieldValue("icon", value)}
              >
                <SelectTrigger className="border border-[#D1D5DB] rounded-[8px]">
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#D1D5DB] rounded-[8px] grid grid-cols-3">
                  <div className="h-fit">
                    <div className="grid grid-cols-6 p-4">
                      {hardDataIcons.map((el) => {
                        const IconComponent = Icons[el.iconName];
                        return (
                          <SelectItem key={el.iconName} value={el.iconName}>
                            <IconComponent
                              color={iconColor}
                              className={classNames("cursor-pointer w-6 h-6")}
                            />
                          </SelectItem>
                        );
                      })}
                    </div>
                    <div className="border-t-[1px] border-[#D1D5DB]">
                      <div className="flex gap-4 mx-16 my-4">
                        {colors.map((color, index) => (
                          <FaCircle
                            key={index}
                            color={color}
                            className="w-6 h-6 rounded-full cursor-pointer"
                            onClick={() => handleColorClick(color)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </SelectContent>
              </Select>

              {formik.errors.icon ? (
                <p className="text-red-500">{formik.errors.icon}</p>
              ) : null}
            </div>

            <div className="w-full">
              <input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Name"
                className="outline-none py-2 border border-[#D1D5DB] rounded-[8px] px-4 w-full"
              />
              {formik.errors.title ? (
                <p className="text-red-500">{formik.errors.title}</p>
              ) : null}
            </div>
          </div>

          <Button
            className="bg-[#16A34A] hover:bg-green-500 rounded-[20px] text-white"
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
