import React, { useState } from "react";
import { loader } from "../assets";

const Loader = () => {
   return (
      <div className="fixed inset-0 z-10 h-screen bg-[rgbae(0,0,0,0.7)] items-center flex flex-col justify-center">
         <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
         />
         <p className="mt-[10px] font-epilogue font-bold text-[16px] text-white text-center">
            Transaction in progress, please wait
         </p>
      </div>
   );
};

export default Loader;
