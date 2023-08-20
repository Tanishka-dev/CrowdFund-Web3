import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Profile = () => {
   const [isLoading, setisLoading] = useState(true);
   const [campaigns, setcampaigns] = useState([]);
   const { address, contract, getUserCampaigns } = useStateContext();

   const fetchCampaigns = async () => {
      const data = await getUserCampaigns();
      setcampaigns(data);
      setisLoading(false);
   };

   useEffect(() => {
      if (contract) fetchCampaigns();
   }, [address, contract]);
   return (
      <DisplayCampaigns
         title="Your Campaigns"
         isLoading={isLoading}
         campaigns={campaigns}
      />
   );
};

export default Profile;
