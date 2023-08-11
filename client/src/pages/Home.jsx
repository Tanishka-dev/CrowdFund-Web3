import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";

const Home = () => {
   const [isLoading, setisLoading] = useState(false);
   const [campaigns, setcampaigns] = useState([]);
   const { address, contract, getCampaigns } = useStateContext();

   const fetchCampaigns = async () => {
      setisLoading(true);
      const data = await getCampaigns();
      setcampaigns(data);
      setisLoading(false);
   };

   useEffect(() => {
      if (contract) fetchCampaigns();
   }, [address, contract]);

   return <div></div>;
};

export default Home;
