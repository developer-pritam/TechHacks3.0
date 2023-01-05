import React, { useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import Stepper from "react-stepper-horizontal";
import { Loader } from ".";
import { WalletContext } from "../context/WalletContext";
import NFTCard from "./NFTCard";
import placeholderImg from "../../images/placeholder.png";

// const companyCommonStyles =
//   "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const GenerateNFT = () => {
  const { currentAccount, getNFTs } = useContext(WalletContext);
  const [form, setForm] = React.useState({
    prompt: "",
    image: placeholderImg,
    symbol: "",
    description: "",
    name: "",
    isLoading: false,
    buttonLoading: false,
    activeStep: 0,
  });
  const handleChange = (e, name) => {
    setForm({ ...form, [name]: e.target.value });
  };
  const geterateNFT = async () => {
    if (!currentAccount) return toast.error("Please connect wallet");
    if (
      form.name.length < 3 ||
      form.prompt.length < 5 ||
      form.symbol.length < 2 ||
      form.description.length < 5
    ) {
      toast.error("Please fill all the fields");
      return null;
    }
    setForm({ ...form, isLoading: true });
    const res = await fetch(
      "https://us-central1-fir-project-82e95.cloudfunctions.net/NFTapis/getImageUrl",
      {
        method: "POST",
        body: JSON.stringify({ "text-prompt": form.prompt }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log(data);

    setForm({
      ...form,
      image: data.downnloadUrl,
      isLoading: false,
      activeStep: 1,
    });
    return null;
  };
  const mintNFT = async () => {
    if (
      form.name.length < 3 ||
      form.prompt.length < 5 ||
      form.symbol.length < 2 ||
      form.description.length < 5
    ) {
      toast.error("Please fill all the fields");
      return null;
    }
    setForm({ ...form, buttonLoading: true });
    const res = await fetch(
      "https://us-central1-fir-project-82e95.cloudfunctions.net/NFTapis/mintNFT",
      {
        method: "POST",
        body: JSON.stringify({
          imageUri: form.image,
          symbol: form.symbol,
          description: form.description,
          name: form.name,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log(data);
    toast.success("NFT Minted Successfully, transfering to your wallet");
    const { mintID } = data;
    setForm({
      ...form,
      buttonLoading: true,
      activeStep: 2,
    });
    const transferRes = await fetch(
      "https://us-central1-fir-project-82e95.cloudfunctions.net/NFTapis/transferNFT",
      {
        method: "POST",
        body: JSON.stringify({
          mintID,
          recipient: currentAccount,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    getNFTs();
    setForm({
      ...form,
      buttonLoading: false,
      activeStep: 3,
    });
    toast.success("NFT minted successfully, check your wallet");
    setTimeout(() => {
      setForm({
        ...form,
        activeStep: 0,
        image: placeholderImg,
        prompt: "",
        symbol: "",
        description: "",
        name: "",
      });
    }, 2000);
    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.image === placeholderImg) geterateNFT();
    else mintNFT();
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <div>
        <Stepper
          size={50}
          activeBorderColor="#2952e3"
          steps={[
            { title: "" },
            { title: "Generate Image" },
            { title: "Mint NFT" },
            { title: "Transfer NFT" },
          ]}
          activeStep={form.activeStep}
        />
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-10 py-12 px-4">
          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <div className="p-10 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <Input
                placeholder="Text to generate NFT"
                name="prompt"
                type="text"
                value={form.prompt}
                handleChange={handleChange}
              />
              <Input
                placeholder="NFT Name"
                name="name"
                type="text"
                value={form.name}
                handleChange={handleChange}
              />
              <Input
                placeholder="Symbol"
                name="symbol"
                type="text"
                value={form.symbol}
                handleChange={handleChange}
              />
              <Input
                placeholder="description"
                name="description"
                type="text"
                value={form.description}
                handleChange={handleChange}
              />

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {form.buttonLoading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  {form.image === placeholderImg
                    ? "Generate Image"
                    : "Generate NFT"}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <NFTCard {...{ url: form.image, isLoading: form.isLoading }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateNFT;
