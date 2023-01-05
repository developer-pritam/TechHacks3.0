import createNFTService from "../services/createNFT-service.js";
class GetNFTDataController {
  async getNFTData(req, res) {
    const { publicKey } = req.body;
    try {
      const nfts = await createNFTService.getNFTsByPublicKey(publicKey);
      return res.status(200).send({
        status: true,
        message: "NFTs fetched successfully",
        nfts,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: false, message: error.message });
    }
  }
}
export default new GetNFTDataController();
