import { GetBalanceOf } from "@/hooks/useGetSingleTokens";
import EventTable from "./ERC20Event";

export function ContractOverview({
  symbol,
  supply,
  decimal,
  userBalance,
  name,
  address,
  logs,
}: {
  symbol: string;
  supply: string;
  decimal: number;
  userBalance: number;
  name: string;
  address: string;
  logs: any[];
}) {
  const balance = GetBalanceOf(address);
  // console.log(balance);

  return (
    <div className="mt-4">

      <h2 className="text-2xl font-bold">Token Details</h2>

      <div className="mt-6 flex flex-col md:flex-row md:w-[70%] gap-4">
        <div className="mr-8 block w-full lg:w-fit max-w-sm cursor-pointer rounded-lg border border-gray-600 p-5 shadow overflow-h ">
          <h5 className="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-white">
            Total Supply
          </h5>

          <p className="text-xl font-normal text-gray-100 overflow-hidden">
            {Number(supply)} {symbol}
          </p>
        </div>
        <div className="mr-8 block w-full md:w-fit  max-w-sm cursor-pointer rounded-lg border border-gray-600 p-5 shadow">
          <h5 className="mb-2 text-xl font-normal tracking-tight text-white">
            Owned by you
          </h5>
          <p className="text-xl font-normal text-gray-100">
            {Number(balance) / Math.pow(10, decimal)} {symbol}
          </p>
        </div>
        <div className="mr-8 block w-full lg:w-fit  max-w-sm cursor-pointer rounded-lg border border-gray-600 p-5 shadow">
          <h5 className="mb-2 text-xl font-normal tracking-tight text-white">
            Decimals
          </h5>
          <p className="text-xl font-normal text-gray-100">{decimal || 0}</p>
        </div>
      </div>
      {/* Events */}
      <div className="mt-10">
        <EventTable logs={logs} address={address} />
      </div>

    </div>
  );
}
