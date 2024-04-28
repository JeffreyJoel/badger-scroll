"use client";

import { useRouter } from "next/navigation";

// import { Spinner } from "@/components/ui/spinner";

export function ExploreTokenTable({
  tableData,
  isLoading,

}: {
  tableData: any[];
  isLoading?: boolean;
}) {
  const router = useRouter();
  return (
    <div className="relative overflow-x-auto rounded">
      {tableData?.length < 1 ? (
        <div className="mt-6 w-full overflow-hidden">
          <p className="text-center text-red-700">
            You have not created any tokens
          </p>

          <div className=" mx-auto h-10 w-10 "></div>
        </div>
      ) : (
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transaction Hash
              </th>
              <th scope="col" className="px-6 py-3">
                Creator
              </th>
              <th scope="col" className="px-6 py-3">
                Token Name
              </th>
              <th scope="col" className="px-6 py-3">
                Token Symbol
              </th>
              <th scope="col" className="px-6 py-3 ">
                Address
              </th>
            </tr>
          </thead>

          <tbody>
            {tableData?.map(
              (data, index) => (
                <tr key={index} className="border-b dark:border-gray-70">
                  <th
                    scope="row"
                    className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium text-purple-600 "
                    onClick={() => {
                      router.push(`/dashboard/contracts/${data?.address}`);
                    }}
                  >
                    {String(data?.transactionHash).substring(0, 8)}...
                    {String(data?.transactionHash).substring(
                      String(data?.transactionHash).length - 9,
                      String(data?.transactionHash).length - 1
                    )}
                  </th>
                  <th
                    scope="row"
                    className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium"
                    onClick={() => {
                      router.push(
                        `/dashboard/contracts/${data?.transactionHash}`
                      );
                    }}
                  >
                    {String(data?.creator).substring(0, 8)}...
                    {String(data?.creator).substring(
                      String(data?.creator).length - 9,
                      String(data?.creator).length - 1
                    )}
                  </th>
                  <td className="px-6 py-4">{data?.name}</td>
                  <td className="px-6 py-4">{data?.symbol}</td>
                  <td className="px-6 py-4">
                    {String(data?.tokenAddress).substring(0, 8)}...
                    {String(data?.tokenAddress).substring(
                      String(data?.tokenAddress).length - 9,
                      String(data?.tokenAddress).length - 1
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
