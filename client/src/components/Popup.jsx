import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { WalletContext } from "../context/WalletContext";

const Popup = () => {
  const { isPhantomInstalled, setCurrentAccount, setIsPhantomInstalled } =
    useContext(WalletContext);
  const [wallet, setWallet] = useState("");
  const onSubmit = () => {
    if (wallet.length > 10) {
      setCurrentAccount(wallet);
      setIsPhantomInstalled("NO");
    } else {
      toast.error("Invalid wallet address");
    }
  };
  const onChange = (e) => {
    setWallet(e.target.value);
  };
  return (
    <div
      className={`w-full h-full bg-gradient-to-b ${
        isPhantomInstalled !== "YES" ? "hidden" : ""
      } from-blue-500 flex justify-center items-center modal fade fixed top-0 left-0 z-50`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className=" sm:w-8/12 w-11/12 outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModalCenter"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalScrollableLabel"
              >
                We have detected that you don't have a Phantom wallet installed,
                you can enter your wallet address (Public Key) here to continue.
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50
             focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body relative p-4">
              <input
                type="text"
                name="walletAddress"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400
               focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Your wallet address"
                onChange={onChange}
                value={wallet}
              />
              <br />
              <p className=" text-xs ">
                You can use this test wallet address to continue.
                HvpWKDCGiLdGXBbuxyz1U5w5469DRTUXLV6NRdDLRBvt
              </p>
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                onClick={() => {
                  setIsPhantomInstalled("NO");
                }}
                type="button"
                className="inline-block px-6 py-2.5 bg-purple-300 text-white font-medium text-xs leading-tight
             uppercase rounded shadow-md hover:bg-purple-400 hover:shadow-lg focus:bg-purple-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
             focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
              >
                Add Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
