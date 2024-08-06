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
                    <div className="flex justify-around w-full border">
                      <div className="h-fit w-fit grid">
                        <div>{item.icon}</div>
                        <p className="text-black">{item.category}</p>
                        <p className="text-black text-[12px]">{item.time}</p>
                        <p>{item.payee}</p>
                      </div>
                      <div className="text-[#EAB308] w-fit">{item.amount}</div>
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
