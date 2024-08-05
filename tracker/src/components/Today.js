"use client";

export const Today = ({ categories }) => {
  // Debugging logs
  console.log("categories", categories);

  return (
    <div>
      <p className="mb-3 font-semibold text-[16px]">Today</p>
      <div className="h-fit grid gap-3">
        {categories.map((item) => {
          return (
            <div
              className="bg-white border border-[#E5E7EB] rounded-xl px-6 py-3"
              key={item.id}
            >
              <div className="flex gap-3">
                <div className="mt-2">
                  <input type="checkbox" className="w-6 h-6" />
                </div>
                <div className="flex gap-3">
                  <div>
                    <div className="flex justify-between w-full">
                      <div className="h-fit grid">
                        <p className="text-black border h-12 w-12">
                          {item.category}
                          {/* Adjust based on the actual structure */}
                        </p>
                        <p className="text-black text-[12px]">{item.time}</p>
                        <p>{item.payee}</p>
                      </div>
                      <div className="text-[#EAB308]">{item.amount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
