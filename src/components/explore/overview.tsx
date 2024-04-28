import React, { useState } from "react";
import InfoCard from "../dashboard/shared/InfoCard";
import NoToken from "../dashboard/NoTokens";
import { MostRecentERC20s } from "./MostRecentERC20";
import { useFetchAllERC20Tokens, useFetchAllERC721Tokens } from "@/hooks/useFetchAllTokens";
import { MostRecentERC721s } from "./MostRecentNFTs";

export function OverviewComponent() {
  const {erc20, erc20loading} = useFetchAllERC20Tokens();
  const {erc721s, erc721Loading} = useFetchAllERC721Tokens();

  if (erc20loading || erc721Loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-14 rounded-lg  border-dashed border-gray-200 p-8  dark:border-gray-700">
 
      {erc20.length < 1 && erc721s.length < 1 ? (
        <div>
          <h2 className="text-4xl text-center">No Tokens have been created</h2>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold lg:text-3xl">Overview</h2>

          <div className="mt-4 flex">
            <InfoCard title="Contracts Deployed" content={erc20.length + erc721s.length} />
            <InfoCard title="Tokens Deployed" content={erc20.length} />
            <InfoCard title="NFTs Deployed" content={erc721s.length} />
          </div>

          <MostRecentERC20s
            tableData={erc20}
          />
          <MostRecentERC721s
          tableData={erc721s}
          />
        </div>
      )}
    </div>
  );
}
