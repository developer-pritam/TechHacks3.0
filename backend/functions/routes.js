import express from "express";
import GenerateImage from "./controller/generate-image.js";
import MintNft from "./controller/mint-nft.js";
import TransferNft from "./controller/transfer-nft.js";
import UploadImageController from "./controller/upload-image.js";
import getnftData from "./controller/getnft-data.js";
import airdropController from "./controller/airdrop-controller.js";
// import cors from "./cors.js";
const routes = express.Router();
// routes.use(cors);
import cors from "cors";
const allowlist = [
  "http://localhost:3000",
  "http://developerpritam.com",
  "https://ai-nft-minter.web.app",
];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  console.log(req.header("Origin"));

  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
routes.use(cors(corsOptionsDelegate));

routes.post("/getImageUrl", GenerateImage.getImageUri);
routes.post("/mintNFT", MintNft.mintNFT);
routes.post("/transferNFT", TransferNft.transferNFT);
routes.post("/uploadImage", UploadImageController.uploadImage);
routes.post("/getNFTs", getnftData.getNFTData);
routes.post("/getAirdrop", airdropController.getAirdrop);
export default routes;
