import React, { useEffect, useState } from "react";

export const WalletContext = React.createContext();

export const WalletProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [nftList, setNftList] = useState([]);
  const [isNFTLoading, setIsNFTLoading] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);
  let toast = null;
  const setToast = (toastObj) => {
    toast = toastObj;
  };
  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;
      if (provider?.isPhantom) {
        return provider;
      }
    }
    setIsPhantomInstalled("YES");

    toast.error("Please install Phantom wallet");
    // window.open("https://phantom.app/", "_blank");
    return null;
  };
  const getNFTs = async () => {
    if (!currentAccount) return null;
    setIsNFTLoading(true);

    try {
      const res = await fetch(
        "https://us-central1-fir-project-82e95.cloudfunctions.net/NFTapis/getNFTs",
        {
          method: "POST",
          body: JSON.stringify({
            publicKey: currentAccount,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.status !== 200) return null;
      setNftList(data.nfts);
    } catch (error) {
      toast.error("Unable to get NFT list");
    }
    setIsNFTLoading(false);
    return null;
  };
  const connectWallet = async () => {
    if (currentAccount) return null;
    const provider = getProvider();
    if (!provider) return null;
    console.log(provider);
    try {
      const resp = await provider.connect();
      toast.success("Phantom wallet connected");

      setCurrentAccount(resp.publicKey.toString());
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
      setIsPhantomInstalled("YES");
      toast.error(err.message);
    }
    return currentAccount;
  };

  useEffect(() => {
    getNFTs();
  }, [currentAccount]);

  return (
    <WalletContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        connectWallet,
        currentAccount,
        toast,
        nftList,
        setToast,
        isNFTLoading,
        getNFTs,
        isPhantomInstalled,
        setCurrentAccount,
        setIsPhantomInstalled,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
