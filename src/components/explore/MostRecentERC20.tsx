import { ExploreTokenTable } from "@/components/explore/ExploreTable";
import { useFetchAllERC20Tokens } from "@/hooks/useFetchAllTokens";

export function MostRecentERC20s({ tableData }: { tableData:any[] }) {
  // console.log(tableData)

  return (
    <div className="mt-20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ERC20 Tokens
          </h3>
          <small className="text-lg font-light text-gray-200">
            The list of the most recent 5 Fungible token instances deployed with
            badger on Scroll.
          </small>
        </div>

        {/* <CreateERC20 /> */}
      </div>
      <ExploreTokenTable tableData={tableData} isLoading={false}/>
    </div>
  );
}
