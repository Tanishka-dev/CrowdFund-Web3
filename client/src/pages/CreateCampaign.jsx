import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { checkIfImage } from "../utils";
import { CustomButton, FormField } from "../components";
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

   const handeleSubmit = () => {};
   return (
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-4">
         {isLoading && "Loader.."}
         <div className="bg-[#3a3a43] flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]">
            <h1 className="text-white font-epilogue font-bold text-[18px] sm:text-[25px] leading-[38px] ">
               Start a Campaign 🚀
            </h1>
         </div>

         <form
            onSubmit={handeleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
         >
            <div className="flex flex-wrap gap-[40px] ">
               <FormField
                  labelName="Your Name*"
                  placeholder="Type ypur name"
                  inputType="text"
                  value={form.name}
                  handeleChange={() => {}}
               />
               <FormField
                  labelName="Campaign Title*"
                  placeholder="Write a Title"
                  inputType="text"
                  value={form.title}
                  handeleChange={() => {}}
               />
            </div>
            <FormField
               labelName="Story*"
               placeholder="Write your story"
               isTextArea
               value={form.title}
               handeleChange={() => {}}
            />
         </form>
      </div>
   );
};

export default CreateCampaign;
