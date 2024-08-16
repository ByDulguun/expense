import { useEffect, useState } from "react";
import axios from "axios";
import * as Icons from "react-icons/pi";
import classNames from "classnames";

export const Today = ({ filterType, setVisibleEye, visibleEye }) => {
  const [categories, setCategories] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const token = localStorage.getItem("token");

  const renderIcon = (recordCategoryId) => {
    const record = records?.find((el) => el.id === recordCategoryId);

    if (record) {
      const IconComponent = Icons[record.icon];
      return (
        <div className="flex gap-2 relative mx-2 my-2">
          <IconComponent
            className={classNames("cursor-pointer w-10 h-10 my-2")}
            color={record.iconColor}
          />
          <p className="text-lg font-normal">{record.title}</p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    const getCategoriesData = async () => {
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

    const getRecordsData = async () => {
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

    getCategoriesData();
    getRecordsData();
  }, [token]);

  useEffect(() => {
    const newSelectedItems = {};
    categories.forEach((el) => {
      newSelectedItems[el.id] = selectAll;
    });
    setSelectedItems(newSelectedItems);
  }, [selectAll, categories]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = categories.reduce((sum, el) => {
        if (selectedItems[el.id]) {
          return el.status === "income" ? sum + el.amount : sum - el.amount;
        }
        return sum;
      }, "");
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [selectedItems, categories]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: !prevSelectedItems[id],
    }));
  };

  const filteredCategories = categories?.filter((category) => {
    if (filterType === "all") return true;
    return category.status === filterType;
  });

  return (
    <div>
      <div className="bg-white my-4 rounded-xl border border-[#E5E7EB]">
        <div className="px-6 py-3 flex justify-between">
          <div className="flex gap-3">
            <input
              type="Checkbox"
              className="w-6 h-6"
              checked={selectAll}
              onChange={() => setSelectAll(!selectAll)}
            />
            <p>Select All</p>
          </div>
          <p className="text-[#94A3B8]">{totalAmount.toLocaleString()}₮</p>
        </div>
      </div>
      <p className="mb-3 font-semibold text-[16px]">Today</p>
      {filteredCategories?.map((el, index) => (
        <div
          key={el.id + index}
          className={`bg-white border border-[#E5E7EB] rounded-xl my-2 ${
            visibleEye && visibleEye !== el.category ? "invisible" : "visible"
          }`}
        >
          <div className="flex justify-between mx-4 items-center">
            <div className="flex relative items-center">
              <input
                type="checkbox"
                className="w-6 h-6"
                checked={!!selectedItems[el.id]}
                onChange={() => handleCheckboxChange(el.id)}
              />
              <div className="relative">{renderIcon(el.category)}</div>
              <div>
                <div className="mx-12 absolute top-10 left-8 text-[12px] text-[#6B7280]">
                  {el.time}
                </div>
              </div>
            </div>
            <div
              className={`${
                el.status === "income" ? "text-[#23E01F]" : "text-[#F54949]"
              }`}
            >
              <p>
                {el.status === "income" ? `+ ${el.amount}` : `- ${el.amount}`}₮
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
