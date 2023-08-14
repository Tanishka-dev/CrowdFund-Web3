import React, { useState } from "react";
import { ethers } from "ethers";
import { thirdweb } from "../assets";
import { daysLeft, calculateBarPercentage } from "../utils";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../context";
import { CustomButton } from "../components";

const CampaignDetails = () => {
   const [isLoading, setisLoading] = useState(false);
   const [amount, setamount] = useState("");
   const [donators, setdonators] = useState([]);
   const state = useLocation();
   const { getDonations, address, contract } = useStateContext();
   const remainingDays = daysLeft(state.deadline);
   return <div>Loading</div>;
};

export default CampaignDetails;
