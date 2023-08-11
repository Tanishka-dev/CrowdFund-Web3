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
      "0x6E93DADA32C6BBe5b5cf16aa7754A67AAE729e95"
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

         console.log("done", data);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <StateContext.Provider
         value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
         }}
      >
         {children}
      </StateContext.Provider>
   );
};

export const useStateContext = () => useContext(StateContext);
