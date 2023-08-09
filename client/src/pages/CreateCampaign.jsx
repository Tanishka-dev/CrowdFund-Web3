import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { checkIfImage } from "../utils";
import { CustomButton } from "../components";
const CreateCampaign = () => {
   const navigate = useNavigate();
   const [isLoading, setisLoading] = useState(false);
   const [form, setform] = useState({
      name: "",
      deadline: "",
      title: "",
      target: "",
      description: "",
      image: "",
   });
   return (
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-4">
         {isLoading && "Loader.."}
         <div className="bg-[#3a3a43] flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]">
            <h1 className="text-white font-epilogue font-bold text-[18px] sm:text-[25px] leading-[38px] ">
               Start a Campaign 🚀
            </h1>
         </div>
      </div>
   );
};

export default CreateCampaign;
