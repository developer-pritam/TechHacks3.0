import createNFTService from "../services/createNFT-service.js";
class AirdropController {
  async getAirdrop(req, res) {
    const { recipient, amount } = req.body;
    const txhash = await createNFTService.airdrop(recipient, amount);
    res.send({ status: true, txhash });
  }
}
export default new AirdropController();
