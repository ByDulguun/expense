import { CloseIcon } from "@/assets/icon/CloseIcon";
import { useState } from "react";
import { RecordBar } from "./RecordBar";

const RecordAdd = ({ open, setOpen }) => {
  return (
    <div
      className={`  top-0  w-screen h-screen bg-[#00000080] fixed  border ${
        open ? "invisible" : "visible"
      }
            }  duration-150 flex items-center justify-center`}
    >
      <div>
        <div className="relative">
          <RecordBar />

          <div
            onClick={() => setOpen(!open)}
            className="absolute top-3 right-3 cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecordAdd;
