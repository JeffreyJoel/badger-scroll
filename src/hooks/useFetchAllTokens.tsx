import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { getProvider } from '@/constants/providers';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import { getFungibleContract } from '@/constants/contracts';

export const useFetchAllERC20Tokens = () => {
  const [erc20, setErc20] = useState([]);
  const [erc20loading, setErc20Loading] = useState(true);
  const { walletProvider } = useWeb3ModalProvider();
  const readWriteProvider = getProvider(walletProvider);

  const QueryURL =
    'https://api.studio.thegraph.com/query/72146/scroll-badger/version/latest';

  const GET_TRANSFERS = gql`
    query {
      fungibleTokenCreateds(first: 5) {
        id
        creator
        tokenAddress
        blockNumber
        transactionHash
      }
    }
  `;

  useEffect(() => {
    const client = new ApolloClient({
      uri: QueryURL,
      cache: new InMemoryCache(),
    });

    const fetchTransfers = async () => {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : null;

      try {
        const { data } = await client.query({ query: GET_TRANSFERS });
        const tokensWithDetails = await Promise.all(
          data.fungibleTokenCreateds.map(async (token: any) => {
            const contract = getFungibleContract(signer, token.tokenAddress);
            const symbol = await contract.symbol();
            const name = await contract.name();
            return { ...token, symbol, name };
          })
        );
        setErc20(tokensWithDetails as never[]);
        setErc20Loading(false)
        console.log(tokensWithDetails);
      } catch (error) {
        console.log('error fetching data:', error);
        setErc20Loading(false)
      }
    };

    fetchTransfers();
  }, [GET_TRANSFERS]);

  return {erc20, erc20loading};
};

export const useFetchAllERC721Tokens = () => {
  const [erc721s, setErc721s] = useState([]);
  const [erc721Loading, setErc721Loading] = useState(true);

  const { walletProvider } = useWeb3ModalProvider();
  const readWriteProvider = getProvider(walletProvider);

  const QueryURL =
    'https://api.studio.thegraph.com/query/72146/scroll-badger/version/latest';

  const GET_TRANSFERS = gql`
    query {
      nftsCreateds(first: 5) {
        id
        creator
        tokenAddress
        blockNumber
        transactionHash
      }
    }
  `;

  useEffect(() => {
    const client = new ApolloClient({
      uri: QueryURL,
      cache: new InMemoryCache(),
    });

    const fetchTransfers = async () => {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : null;

      try {
        const { data } = await client.query({ query: GET_TRANSFERS });
        const tokensWithDetails = await Promise.all(
          data.fungibleTokenCreateds.map(async (token: any) => {
            const contract = getFungibleContract(signer, token.tokenAddress);
            const symbol = await contract.symbol();
            const name = await contract.name();
            return { ...token, symbol, name };
          })
        );
        setErc721s(tokensWithDetails as never[]);
        setErc721Loading(false)
        console.log(tokensWithDetails);
      } catch (error) {
        console.log('error fetching data:', error);
        setErc721Loading(false)

      }
    };

    fetchTransfers();
  }, [GET_TRANSFERS]);

  return {erc721s, erc721Loading};
};