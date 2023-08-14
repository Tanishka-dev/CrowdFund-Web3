import React, { useContext, createContext } from "react";
import {
   useContract,
   useAddress,
   useMetamask,
   useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
   const { contract } = useContract(
      "0xde2e5966d9C63736dc5e8e6AE07E781D071eEFf7"
   ); //creating contract with id of sepolia

   const { mutateAsync: createCampaign } = useContractWrite(
      contract,
      "createCampaign"
   ); //calling function createCampaign from web3 logic

   const address = useAddress();
   const connect = useMetamask();

   const publishCampaign = async (form) => {
      try {
         const data = await createCampaign({
            args: [
               address, //owner
               form.title,
               form.description,
               form.target,
               new Date(form.deadline).getTime(), //deadline converted to seconds from 1970
               form.image,
            ],
         });
      } catch (error) {
         console.log(error);
      }
   };

   const getCampaigns = async () => {
      const campaigns = await contract.call("getCampaigns", []);

      const parsedCampaigns = campaigns.map((campaign) => ({
         owner: campaign.owner,
         title: campaign.title,
         description: campaign.description,
         target: ethers.utils.formatEther(campaign.target.toString()),
         deadline: campaign.deadline.toNumber(),
         amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
         ),
         image: campaign.image,
      }));
      console.log(parsedCampaigns);

      return parsedCampaigns;
   };

   const getUserCampaigns = async () => {
      const allCampaigns = await getCampaigns();

      const filteredUserCampaigns = allCampaigns.filter(
         (campaign) => campaign.owner === address
      );

      return filteredUserCampaigns;
   };

   return (
      <StateContext.Provider
         value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            getCampaigns,
            getUserCampaigns,
         }}
      >
         {children}
      </StateContext.Provider>
   );
};

export const useStateContext = () => useContext(StateContext);
