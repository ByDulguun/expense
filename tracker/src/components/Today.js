import { useEffect, useState } from "react";
import axios from "axios";
import * as Icons from "react-icons/pi";
import classNames from "classnames";

export const Today = ({ filterType }) => {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

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
  const filteredCategories = categories.filter((category) => {
    if (filterType === "all") return true;
    return category.status === filterType;
  });
  return (
    <div className="my-3">
      <p className="mb-3 font-semibold text-[16px]">Today</p>
      <div className="h-fit grid gap-3">
        {categories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.id}>
              {accounts.map((account) => {
                const IconComponent = Icons[account.icon];
                return (
                  <div className="bg-white border border-[#E5E7EB] rounded-xl my-2">
                    <div
                      key={account.id}
                      className="flex justify-between mx-6 my-3"
                    >
                      <div className="flex gap-3">
                        <div className="mt-2">
                          <input type="checkbox" className="w-6 h-6" />
                        </div>
                        <div className="flex gap-3">
                          <div className="flex items-center gap-2">
                            {IconComponent && (
                              <IconComponent
                                className={classNames(
                                  "cursor-pointer w-10 h-10"
                                )}
                                color={account.iconColor}
                              />
                            )}
                            <div>
                              {account.title}
                              <p className="text-[12px] text-[#6B7280]">
                                {category.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${
                          category.status === "income"
                            ? "text-[#23E01F]"
                            : "text-[#F54949]"
                        }`}
                      >
                        {category.status === "income"
                          ? `+ ${category.amount}`
                          : `- ${category.amount}`}
                        ₮
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};
