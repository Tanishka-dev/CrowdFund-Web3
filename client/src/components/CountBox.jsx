import React from "react";
import { useSelector } from "react-redux";

const CountBox = ({ title, value }) => {
   const isDark = useSelector((state) => state.value);
   return (
      <div className="flex flex-col items-center w-[150px]">
         <h4
            className={` ${
               isDark ? `bg-[#1c1c24]` : `bg-[#ECECF1]`
            } font-epilogue font-bold text-[30px] text-white p-3  rounded-t-[10px] w-full text-center truncate`}
         >
            {value}
         </h4>
         <p
            className={` ${
               isDark
                  ? `bg-[#28282e] text-[#808191]`
                  : `bg-[#D9D9E3] text-[#808191]`
            } font-epilogue font-normal text-[16px]  p-3  px-3 py-2 rounded-b-[10px] w-full text-center `}
         >
            {title}
         </p>
      </div>
   );
};

export default CountBox;
