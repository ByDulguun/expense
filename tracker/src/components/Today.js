import { useEffect, useState } from "react";
import axios from "axios";
import * as Icons from "react-icons/pi";
import classNames from "classnames";

export const Today = ({ categories }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState(null);

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
  const deleteAccount = async () => {
    if (selectedAccountId) {
      await axios.delete(`http://localhost:3001/accounts/${selectedAccountId}`);
      setAccounts(
        accounts.filter((account) => account.id !== selectedAccountId)
      );
      setSelectedAccountId(null);
    }
  };

  return (
    <div>
      <p className="mb-3 font-semibold text-[16px]">Today</p>
      {categories.map((item) => (
        <div key={item.id}>
          {accounts.map((account) => {
            const IconComponent = Icons[account.icon];
            return (
              <div
                className="bg-white border border-[#E5E7EB] rounded-xl px-6 py-3 h-fit mt-4"
                onClick={() => setSelectedAccountId(accounts.id)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedAccountId === accounts.id ? "#f0f0f0" : "white",
                }}
              >
                <div className="flex gap-3">
                  <div className="mt-2">
                    <input type="checkbox" className="w-6 h-6" />
                  </div>
                  <div className="flex gap-3 w-fit">
                    <div>
                      <div className="flex justify-between w-[940px] items-center ">
                        <div className="flex gap-2">
                          <div
                            key={account.id}
                            className="flex items-center gap-2"
                          >
                            {IconComponent && (
                              <IconComponent
                                className={classNames(
                                  "cursor-pointer w-10 h-10"
                                )}
                                color={account.iconColor}
                              />
                            )}
                            <div>
                              <p>{account.title}</p>
                              <p className="text-[12px] text-gray-500">
                                {item.time}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p>{item.payee}</p>
                          </div>
                        </div>
                        <div className="text-[#23E01F]">
                          <p>{item.amount}₮</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
