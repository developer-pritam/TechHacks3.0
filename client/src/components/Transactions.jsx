import React, { useContext } from "react";

import { WalletContext } from "../context/WalletContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const TransactionsCard = ({ name, symbol, metadata, mintAddress }) => {
  // const gifUrl = useFetch({ keyword });
  const h = "";
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a
            href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
            target="blank"
          >
            <p className="text-white text-base">
              NFT hash: {shortenAddress(mintAddress)}
            </p>
          </a>

          <p className="text-white text-base">Symbol: {symbol} </p>
          {metadata.description && (
            <p className="text-white text-base">
              Description: {metadata.description}
            </p>
          )}
        </div>
        <img
          src={metadata.image}
          alt="NFT"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{name}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, nftList, isNFTLoading } = useContext(WalletContext);

  return (
    <div
      id="viewNFT"
      className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions"
    >
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">Your NFTs</h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your wallet to see your NFTs
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {isNFTLoading && <Loader />}
          {nftList.map((nft, i) => (
            <TransactionsCard key={i} {...nft} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
