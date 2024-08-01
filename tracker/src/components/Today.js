import { FoodIcon } from "@/assets/icon/FoodICon";
import { HouseIcon } from "@/assets/icon/HouseIcon";
import { useState } from "react";

export const Today = () => {
  const [categories, setCategories] = useState([]);
  return (
    <div>
      <p className="mb-3 font-semibold text-[16px]">Today</p>
      <div className="h-fit grid gap-3">
        <div className="bg-white border border-[#E5E7EB] rounded-xl">
          <div className="flex justify-between mx-6 my-3">
            <div className="flex gap-3 ">
              <div className="mt-2  ">
                <input type="Checkbox" className="w-6 h-6 "></input>
              </div>
              <div className="flex gap-3">
                <HouseIcon />
                <div>
                  {categories.map((categories, index) => {
                    return (
                      <div key={categories.title + index}>
                        <p>{categories.title}</p>
                      </div>
                    );
                  })}
                  <p className="text-[12px] text-[#6B7280]">14:00</p>
                </div>
              </div>
            </div>
            <div className="text-[#23E01F] mt-2">- 1,000₮</div>
          </div>
        </div>
      </div>
    </div>
  );
};
