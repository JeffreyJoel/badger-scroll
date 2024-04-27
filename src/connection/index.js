"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { Inter, Montserrat } from "next/font/google";

export const SUPPORTED_CHAIN = 534351;

export const SCROLL_SEPOLIA_ID = 534351;
const montserrat = Montserrat({ subsets: ["latin"] });

const Shardeum = {
  chainId: SCROLL_SEPOLIA_ID,
  name: "Scroll",
  currency: "ETH",
  explorerUrl: "https://sepolia.scrollscan.com/",
  rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
};

const metadata = {
  name: "Badger for Scroll",
  description: "No code token and nft deployment and interaction",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [Shardeum],
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  enableAnalytics: false, // Optional - defaults
  themeVariables: {
    "--w3m-accent": "#006AFF",
    "--w3m-border-radius-master": "",
    "--w3m-font-size-master": "16",
  },
});

export function Web3Modal({ children }) {
  return children;
}
