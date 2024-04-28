"use client";

import { useState } from "react";
import { NavBar } from "@/components/shared/nav-bar";
import DashboardTabNavigation from "@/components/dashboard/DashboardNav";
import { OverviewComponent } from "@/components/explore/overview";
import { TokenOverview } from "@/components/dashboard/erc20/TokenOverview";
import { NFTOverview } from "@/components/dashboard/nft/NFTOverview";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import EmptyPage from "@/components/shared/EmptyPage";

const Explore = () => {
  const [tab, setTab] = useState(0);
  const { isConnected } = useWeb3ModalAccount();

  return (
    <>
      <NavBar isDashboard={true} />
      {isConnected ? (
        <div className="relative mt-24">
          <DashboardTabNavigation
            tabs={[
              { id: 0, label: "Overview" }
            ]}
            selectedTab={tab}
            setTab={setTab}
          />

          <div className="p-4 sm:container sm:mx-auto">
            <div>
              {tab == 0 ? <OverviewComponent /> : ""}
              {/* {tab == 1 ? <TokenOverview fullPage={true} /> : ""}
              {tab == 2 ? <NFTOverview fullPage={true} /> : ""} */}
            </div>
          </div>
        </div>
      ) : (
        <EmptyPage />
      )}
    </>
  );
};

export default Explore;
