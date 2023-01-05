import { Toaster, toast } from "react-hot-toast";
import { useContext } from "react";

import {
  Navbar,
  Welcome,
  Footer,
  Services,
  Transactions,
  GenerateNFT,
  Popup,
} from "./components";
import { WalletContext } from "./context/WalletContext";

const App = () => {
  const { setToast } = useContext(WalletContext);
  setToast(toast);
  const companyCommonStyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Popup />
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
        <GenerateNFT />

        <div className="flex w-full justify-center items-center md:p-20 ">
          <div className="grid sm:grid-cols-3 grid-cols-2 md:w-9/12 w-11/12 mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Machine Learning
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Solana
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};
export default App;
