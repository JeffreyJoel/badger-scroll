import { useState, useEffect } from 'react';

import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import {
  getFungibleContract,
  getNonFungibleContract,
} from "../constants/contracts";
import { getProvider, readOnlyProvider } from "@/constants/providers";
import { ethers } from "ethers";
import fungibleAbi from "../constants/fungibleAbi.json";


export function getLogs(tokenAddress: string) {
  const [logs, setLogs] = useState<any[]>([]);
 
  useEffect(() => {
     const fetchLogs = async () => {
       try {
         const approvalSignature: string = "Approval(address,address,uint256)";
         const approvalTopic: string = ethers.id(approvalSignature);
 
         const transferSignature: string = "Transfer(address,address,uint256)";
         const transferTopic: string = ethers.id(transferSignature);
 
         const intrfc = new ethers.Interface(fungibleAbi);
 
         let approveLogs = await readOnlyProvider.getLogs({
           address: tokenAddress,
           topics: [approvalTopic],
         });
 
         let transferLogs = await readOnlyProvider.getLogs({
           address: tokenAddress,
           topics: [transferTopic],
         });
 
         let newLogs: any[] = [];
 
         transferLogs.forEach((log: any) => {
           let parsedLog = intrfc.parseLog(log);
           console.debug(parsedLog);
           newLogs.push(parsedLog);
         });
 
         approveLogs.forEach((log: any) => {
           let parsedLog = intrfc.parseLog(log);
           console.debug(parsedLog);
           newLogs.push(parsedLog);
         });
 
         setLogs(newLogs);
       } catch (error) {
         console.error("Error fetching logs:", error);
       }
     };
 
     fetchLogs();
  }, [tokenAddress]); // Added tokenAddress as a dependency
 
  console.log(logs);
 
  return logs;
 }

// export  const useContractEvents = (contractAddress, abi, providerUrl) => {
//   const [events, setEvents] = useState([]);
//   const { walletProvider } = useWeb3ModalProvider();
//   //   const readWriteProvider = getProvider(walletProvider);
//   //   const signer = readWriteProvider ? await readWriteProvider.getSigner() : null;
  
//   //   const contract = getNonFungibleContract(signer, tokenAddress);
 
//   useEffect(() => {
//      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
//      const contract = new ethers.Contract(contractAddress, abi, provider);
 
//      const setupListeners = () => {
//        const eventListeners = [];
 
//        for (const event of abi) {
//          if (event.type === 'event') {
//            const eventName = event.name;
//            const listener = (...eventData) => {
//              console.log(`Event: ${eventName}`, eventData);
//              setEvents((prevEvents) => [...prevEvents, { name: eventName, data: eventData }]);
//            };
//            contract.on(eventName, listener);
//            eventListeners.push(listener);
//          }
//        }
 
//        return () => {
//          // Clean up listeners on component unmount
//          eventListeners.forEach((listener) => {
//            contract.removeListener(listener);
//          });
//        };
//      };
 
//      return setupListeners();
//   }, [contractAddress, abi, providerUrl]);
 
//   return events;
//  };