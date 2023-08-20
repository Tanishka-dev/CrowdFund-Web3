import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { FundCard } from "./index.js";
import { useSelector } from "react-redux";
const DisplayCampaigns = ({ title, campaigns, isLoading }) => {
   const navigate = useNavigate();
   const handleNavigate = (campaign) => {
      navigate(`/campaign-details/${campaign.title}`, { state: campaign });
   };
   const isDark = useSelector((state) => state.value);
   return (
      <div>
         <h1
            className={` &{isDark? text-white: text-[#818183] }font-epilogue font-semibold text-[18px] text-left `}
         >
            {title}: {!isLoading && campaigns.length}
         </h1>
         <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
               <img
                  src={loader}
                  alt="loading"
                  className="w-[100px] h-[100px] object-contain"
               />
            )}
            {!isLoading && campaigns.length === 0 && (
               <p className="font-epilogue font-semibold text-[14px] text-[#818183] leading-[30px]">
                  You don't have any campaigns created yet
               </p>
            )}
            {!isLoading &&
               campaigns.length > 0 &&
               campaigns.map((campaign) => (
                  <FundCard
                     key={campaign.owner}
                     {...campaign}
                     handleClick={() => handleNavigate(campaign)}
                  />
               ))}
         </div>
      </div>
   );
};

export default DisplayCampaigns;
