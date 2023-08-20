import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { web3 } from "../assets";
import { daysLeft, calculateBarPercentage } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { CustomButton, CountBox, Loader } from "../components";
import { useSelector } from "react-redux";
const CampaignDetails = () => {
   const navigate = useNavigate();
   const [isLoading, setisLoading] = useState(false);
   const [amount, setamount] = useState("");
   const [donators, setdonators] = useState([]);
   const { state } = useLocation();
   const { donate, getDonations, address, contract } = useStateContext();
   const remainingDays = daysLeft(state.deadline);
   const isDark = useSelector((state) => state.value);

   const fetchDonators = async () => {
      const data = await getDonations(state.pId);
      console.log(data);

      setdonators(data);
   };

   useEffect(() => {
      if (contract) fetchDonators();
   }, [contract, address]);

   const handleDonate = async () => {
      setisLoading(true);

      await donate(state.pId, amount);

      navigate("/");
      setisLoading(false);
   };

   console.log(state.pId);
   return (
      <div>
         {isLoading && <Loader />}
         <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
            <div className="flex-1 flex-col">
               <img
                  src={state.image}
                  alt="campaign"
                  className="w-full h-[410px] object-contain rounded-xl"
               />
               <div
                  className={` ${
                     isDark ? `bg-[#3a3a43]` : `bg-[#ECECF1]`
                  } relative w-full h-[5px] rounded-[10px]  mt-2`}
               >
                  <div
                     className="absolute h-full rounded-[10px] bg-[#4acd8d] "
                     style={{
                        width: `${calculateBarPercentage(
                           state.target,
                           state.amountCollected
                        )}%`,
                        maxWidth: "100%",
                     }}
                  ></div>
               </div>
            </div>

            <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
               <CountBox title="Days Left" value={remainingDays} />
               <CountBox
                  title={`Raised of ${state.target}`}
                  value={state.amountCollected}
               />
               <CountBox title="Total Backers" value={donators.length} />
            </div>
         </div>

         <div className="flex lg:flex-row mt-[60px] flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
               <div>
                  <h4
                     className={` ${
                        isDark ? `text-white` : `text-[#808191]`
                     } font-epilogue font-semibold text-[18px]  `}
                  >
                     CREATOR
                  </h4>
                  <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                     <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                        <img
                           src={web3}
                           alt="web3"
                           className="w-[60%] object-contain"
                        />
                     </div>
                     <h4
                        className={` ${
                           isDark ? `text-white` : `text-[#808191]`
                        } text-[14px] break-all font-epilogue font-semibold `}
                     >
                        {state.owner}
                     </h4>
                  </div>
               </div>

               <div>
                  <h4
                     className={` ${
                        isDark ? `text-white` : `text-[#808191]`
                     } font-epilogue font-semibold text-[18px] `}
                  >
                     STORY
                  </h4>
                  <div className="mt-[5px]">
                     <p className="font-epilogue font-normal text-[14px] leading-[26px] text-justify text-[#808191]">
                        {state.description}
                     </p>
                  </div>
               </div>
               <div>
                  <h4
                     className={` ${
                        isDark ? `text-white` : `text-[#808191]`
                     } font-epilogue font-semibold text-[18px] `}
                  >
                     DONATORS
                  </h4>
                  <div className="mt-[5px] flex flex-col gap-4">
                     {donators.length > 0 ? (
                        donators.map((item, index) => (
                           <div
                              key={`${item.donator}-${index}`}
                              className="flex justify-between items-center gap-4"
                           >
                              <p className="font-epilogue font-normal text-[14px] break-all leading-[26px] text-justify text-[#b2b3bd]">
                                 {index + 1}.{item.donator}
                              </p>
                              <p className="font-epilogue font-normal text-[14px] break-all leading-[26px] text-justify text-[#808191]">
                                 {item.donation}
                              </p>
                           </div>
                        ))
                     ) : (
                        <p className="font-epilogue font-normal text-[14px] leading-[26px] text-justify text-[#808191]">
                           No donators yet. Be the first one!
                        </p>
                     )}
                  </div>
               </div>
            </div>

            <div className="flex-1">
               <h4
                  className={` ${
                     isDark ? `text-white` : `text-[#808191]`
                  } font-epilogue font-semibold text-[18px] `}
               >
                  FUND
               </h4>
               <div
                  className={` ${
                     isDark ? `bg-[#1c1c24]` : `bg-[#ECECF1]`
                  } mt-[20px] flex flex-col p-4  rounded-[10px]`}
               >
                  <h4 className="font-epilogue font-normal text-[16px] leading-[30px] text-center text-[#808191] ">
                     Fund the campaign
                  </h4>
                  <div className="mt-[20px]">
                     <input
                        type="number"
                        className={`  ${
                           isDark ? ` text-[#acacc0]` : ` text-[#808191]`
                        } w-full py-[10px] sm:px-[20px] px-[15px] border-[#87878e] bg-transparent text-[14px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px] outline-none border-[1px]`}
                        placeholder="ETH 0.1"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setamount(e.target.value)}
                     />

                     <div
                        className={` ${
                           isDark ? `bg-[#13131a]` : `bg-[#D9D9E3]`
                        } my-[20px] p-4  rounded-[10px]`}
                     >
                        <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-[#808191]  ">
                           Back it because you believe in it.
                        </h4>
                        <h4 className=" mt-[10px]font-epilogue font-normal text-[14px] leading-[22px] text-[#808191] ">
                           Support the project for no reward, just beacuse it
                           speaks to you.
                        </h4>
                     </div>
                     <CustomButton
                        title="Fund Campaign"
                        btnType="button"
                        styles="w-full bg-[#8c6dfd]"
                        handleClick={handleDonate}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CampaignDetails;
