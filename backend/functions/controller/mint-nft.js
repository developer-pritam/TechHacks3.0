import createNFTService from "../services/createNFT-service.js";
class MintNFTController {
  async mintNFT(req, res) {
    const { imageUri, name, description, symbol } = req.body;
    const metadataUri = await createNFTService.createMetaData(
      imageUri,
      name,
      description
    );

    console.log(metadataUri, "metadataUri");

    const nft = await createNFTService.mintMFTfromMetadata(
      metadataUri,
      name,
      symbol
    );

    console.log(nft.address.toBase58(), "NFT Address");
    console.log(nft.mint.address.toBase58(), "NFT Mint Address");
    const mintID = nft.token.mintAddress;
    res.status(200).json({ metadataUri, mintID, nft });
  }
}
export default new MintNFTController();
