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
import { AddIcon } from "./AddIcon";

const AddCategory = () => {
  const [accounts, setAccounts] = useState([]);
  const [title, setTitle] = useState("");

  const createAccount = async () => {
    const newAccount = {
      title,
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
  return (
    <div className="bg-[#FFFFFF] w-[450px] h-fit m-auto my-[260px] rounded-xl">
      <p className="py-5 px-6 border-b-[1px] border-[#D1D5DB]">Add Category</p>
      <form>
        <div
          className={` gap-[32px] px-6 py-5 h-fit grid 
           `}
        >
          <div className="flex gap-2">
            <div className="flex-1">
              <Select>
                <SelectTrigger className="w-full py-2 border border-[#D1D5DB] rounded-[8px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border border-[#D1D5DB] rounded-[8px] bg-white">
                  <AddIcon />
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                placeholder="name"
                className="outline-none py-2 border border-[#D1D5DB] rounded-[8px] px-4 w-full"
              />
            </div>
          </div>
          <Button
            className="bg-[#16A34A] hover:bg-green-500 rounded-[20px] text-white"
            onClick={createAccount}
          >
            <p>Add Category</p>
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddCategory;
