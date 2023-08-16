import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { checkIfImage } from "../utils";
import { CustomButton, FormField } from "../components";
import { useStateContext } from "../context";
const CreateCampaign = () => {
   const navigate = useNavigate();
   const [isLoading, setisLoading] = useState(false);
   const { createCampaign } = useStateContext();
   const [form, setform] = useState({
      name: "",
      deadline: "",
      title: "",
      target: "",
      description: "",
      image: "",
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      checkIfImage(form.image, async (exists) => {
         if (exists) {
            setisLoading(true);
            await createCampaign({
               ...form,
               target: ethers.utils.parseUnits(form.target, 18),
            }); // converting format of target eth to make it compatible
            setisLoading(false);
            navigate("/");
         } else {
            alert("Provide valid image URL");
            setform({ ...form, image: "" }); //clearing url
         }
      });
   };
   const handeleChangeField = (fieldName, e) => {
      setform({ ...form, [fieldName]: e.target.value });
   };
   return (
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-4">
         {isLoading && "Loader.."}
         <div className="bg-[#3a3a43] flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]">
            <h1 className="text-white font-epilogue font-bold text-[18px] sm:text-[25px] leading-[38px] ">
               Start a Campaign 🚀
            </h1>
         </div>

         <form
            onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
         >
            <div className="flex flex-wrap gap-[40px] ">
               <FormField
                  labelName="Your Name *"
                  placeholder="Type ypur name"
                  inputType="text"
                  value={form.name}
                  onChange={(e) => handeleChangeField("name", e)}
               />
               <FormField
                  labelName="Campaign Title *"
                  placeholder="Write a Title"
                  inputType="text"
                  value={form.title}
                  onChange={(e) => handeleChangeField("title", e)}
               />
            </div>
            <FormField
               labelName="Story *"
               placeholder="Write your story"
               isTextArea
               value={form.description}
               onChange={(e) => handeleChangeField("description", e)}
            />

            <div className="flex w-full justify-start items-center p-4 bg-[#8c6dfd] rounded-[10px] h-[120px]">
               <img
                  src={money}
                  alt="money"
                  className="w-[40px] h-[40px] object-contain"
               />
               <h1 className="text-white font-epilogue font-bold text-[25px] ml-[20px]">
                  You will get 100% of the raised amount
               </h1>
            </div>
            <div className="flex flex-wrap gap-[40px] ">
               <FormField
                  labelName="Goal *"
                  placeholder="Eth 0.50"
                  inputType="number"
                  value={form.target}
                  onChange={(e) => handeleChangeField("target", e)}
               />
               <FormField
                  labelName="End Date *"
                  placeholder="End date"
                  inputType="date"
                  value={form.deadline}
                  onChange={(e) => handeleChangeField("deadline", e)}
               />
            </div>
            <FormField
               labelName="Campaign Image *"
               placeholder="Place image URL of your campaign"
               inputType="url"
               value={form.image}
               onChange={(e) => handeleChangeField("image", e)}
            />

            <div className="flex justify-center items-center mt-[40px]">
               <CustomButton
                  btnType="submit"
                  title="Submit new campaign"
                  styles="bg-[#1dc071]"
               />
            </div>
         </form>
      </div>
   );
};

export default CreateCampaign;
