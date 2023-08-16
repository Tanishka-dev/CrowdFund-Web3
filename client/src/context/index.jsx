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

      const parsedCampaigns = campaigns.map((campaign, i) => ({
         owner: campaign.owner,
         title: campaign.title,
         description: campaign.description,
         target: ethers.utils.formatEther(campaign.target.toString()),
         deadline: campaign.deadline.toNumber(),
         amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
         ),
         image: campaign.image,
         pId: i,
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

   const donate = async (pId, amount) => {
      const data = await contract.call("donateToCampaign", [pId], {
         value: ethers.utils.parseEther(amount),
      });

      return data;
   };

   const getDonations = async (pId) => {
      const donations = await contract.call("getDonators", [pId]);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
         parsedDonations.push({
            donator: donations[0][i],
            donation: ethers.utils.formatEther(donations[1][i].toString()),
         });
      }

      return parsedDonations;
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
            donate,
            getDonations,
         }}
      >
         {children}
      </StateContext.Provider>
   );
};

export const useStateContext = () => useContext(StateContext);
