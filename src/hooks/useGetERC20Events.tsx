import { useState, useEffect } from 'react';

import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import {
  getFungibleContract,
  getNonFungibleContract,
} from "../constants/contracts";
import { getProvider, readOnlyProvider } from "@/constants/providers";
import { ethers } from "ethers";
import fungibleAbi from "../constants/fungibleAbi.json";

export async function getEvents(tokenAddress: string) {
  const { walletProvider } = useWeb3ModalProvider();
  const readWriteProvider = getProvider(walletProvider);
  const signer = readWriteProvider ? await readWriteProvider.getSigner() : null;

  const contract = getFungibleContract(signer, tokenAddress);

  let events = await contract.queryFilter("Approval");

  // console.log(events);
}
export  function getLogs(tokenAddress: string) {

const [logs, setLogs] = useState<any[]>([]);

useEffect(() => {
  const fetchLogs = async () => {
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
  };

  fetchLogs();
}, []);
console.log(logs);


return logs;
}