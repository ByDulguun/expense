import { useEffect, useState } from "react";
import axios from "axios";
import * as Icons from "react-icons/pi";
import classNames from "classnames";

export const Today = ({ categories }) => {
  const [accounts, setAccounts] = useState([]);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/accounts/`);
        setAccounts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    
    <div>
      <p className="mb-3 font-semibold text-[16px]">Today</p>
      <div>
        {accounts.map((account, index) => {
          const IconComponent = Icons[account.icon];
          const category = categories[index];
          if (category) {
            return (
              <div
                key={account.id}
                className="bg-white border border-[#E5E7EB] rounded-xl px-6 py-3 h-fit mt-4"
              >
                <div className="flex gap-3">
                  <div className="mt-2">
                    <input type="checkbox" className="w-6 h-6" />
                  </div>
                  <div className="flex gap-3 w-fit">
                    <div>
                      <div className="flex justify-between w-[940px]  items-center">
                        <div className="flex gap-2">
                          <div className="flex items-center gap-2">
                            {IconComponent && (
                              <IconComponent
                                className={classNames("cursor-pointer w-10 h-10")}
                                color={account.iconColor}
                              />
                            )}
                            <div>
                              <p>{account.title}</p>
                              <p className="text-[12px] text-gray-500">
                                {category?.time}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${
                            category?.status === "income"
                              ? "text-[#23E01F]"
                              : "text-[#F54949]"
                          }`}
                        >
                          <p>
                            {category.status === "income"
                              ? `+ ${category.amount}`
                              : `- ${category.amount}`}
                            ₮
                          </p>
                        </div>
                      </div>
                      <div className="text-[12px] text-gray-500">
                        <p>{category?.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
         
        })}
      </div>
    </div>
  );
};
