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
        <div className="flex">
          <IconComponent
            className={classNames("cursor-pointer w-10 h-10")}
            color={account.iconColor}
          />
          {account.title}
        </div>
      );
    }

    return null; // Return null or a fallback icon if not found
  };

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/iconcategories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getAccountsData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/accounts");
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
    <div className="border">
      {filteredCategories?.map((el) => (
        <div className="bg-white border border-[#E5E7EB] rounded-xl my-2">
          <div className=" flex justify-between mx-4 align-baseline">
            <div className="flex">
              <input type="checkbox" className="w-6 h-6" />

              {renderIcon(el.category)}
            </div>
            <div>
              <p>{el.amount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
