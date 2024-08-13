import { CloseIcon } from "@/assets/icon/CloseIcon";
import { Button } from "./ui/button";
import AddCategory from "./AddCategory";

const RecordsCategory = ({ setOpenAdd, openAdd }) => {
  return (
    <div
      className={`  top-0  w-screen h-screen bg-[#00000080] fixed  border z-20 ${
        openAdd ? "invisible" : "visible"
      }
          }  duration-150`}
    >
      <div className="relative">
        <AddCategory openAdd={openAdd} setOpenAdd={setOpenAdd} />
      </div>
      <div
        onClick={() => setOpenAdd(!openAdd)}
        className="absolute top-[280px] left-[1300px]"
      >
        <CloseIcon />
      </div>
    </div>
  );
};
export default RecordsCategory;
