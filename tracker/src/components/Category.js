import { SeeIcon } from "@/assets/icon/SeeIcon";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export const Category = () => {
  return (
    <div >
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Food & Drinks
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Shopping
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Housing
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Transportation
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Vehicle
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Life & Entertainment
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Communication, PC
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Financial expenses
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Investments
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Income
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 ">
          <div className="h-fit ">
            <SeeIcon />
          </div>
          Others
        </div>
        <Button variant="outline" size="icon" className="border-none">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
