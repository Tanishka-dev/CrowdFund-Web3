import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
const Home = () => {
   const [isLoading, setisLoading] = useState(true);
   const [campaigns, setcampaigns] = useState([]);
   const { address, contract, getCampaigns } = useStateContext();

   const fetchCampaigns = async () => {
      const data = await getCampaigns();
      setcampaigns(data);
      setisLoading(false);
   };

   useEffect(() => {
      if (contract) fetchCampaigns();
   }, [address, contract]);

   return (
      <DisplayCampaigns
         title="All Campaigns"
         isLoading={isLoading}
         campaigns={campaigns}
      />
   );
};

export default Home;
