import { useEffect, useState } from "react";
import axios from "axios";
import * as Icons from "react-icons/pi";
import classNames from "classnames";

export const Today = ({ filterType }) => {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const renderIcon = (recordCategoryId) => {
    const account = accounts?.find((el) => el.id === recordCategoryId);

    if (account) {
      const IconComponent = Icons[account.icon];
      return (
        <div className="flex gap-2  relative mx-2 my-2">
          <IconComponent
            className={classNames("cursor-pointer w-10 h-10 my-2")}
            color={account.iconColor}
          />
          <p className="text-lg font-normal"> {account.title}</p>
        </div>
      );
    }

    return null; // Return null or a fallback icon if not found
  };

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/iconcategories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getAccountsData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/accounts");
        setAccounts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCategoriesData();
    getAccountsData();
  }, []);
  const filteredCategories = categories?.filter((category) => {
    if (filterType === "all") return true;
    return category.status === filterType;
  });

  return (
    <div>
      {filteredCategories?.map((el) => (
        <div className="bg-white border border-[#E5E7EB] rounded-xl my-2">
          <div className=" flex justify-between mx-4 items-center">
            <div className="flex relative items-center">
              <input type="checkbox" className="w-6 h-6" />
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
