import { CloseIcon } from "@/assets/icon/CloseIcon";
import { useState } from "react";
import { RecordBar } from "./RecordBar";

const RecordAdd = ({ open, setOpen }) => {
  return (
    <div
      className={`  top-0  w-screen h-screen bg-[#00000080] fixed  border ${
        open ? "invisible" : "visible"
      }
            }  duration-150`}
    >
      <div>
        <div className="relative">
          <RecordBar />
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute top-[280px] left-[1450px]"
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};
export default RecordAdd;
