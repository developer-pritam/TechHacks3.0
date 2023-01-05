import createNFTService from "../services/createNFT-service.js";
class TransferNFTController {
  async transferNFT(req, res) {
    const { mintID, recipient } = req.body;

    const userTokenAccount = await createNFTService.getTokenAccount(
      mintID,
      recipient
    );
    console.log(userTokenAccount.address.toBase58(), "User Token Account");
    const ownerTokenAccount = await createNFTService.getTokenAccount(mintID);
    console.log(ownerTokenAccount.address.toBase58(), "Owner Token Account");
    const transfer = await createNFTService.transferNFT(
      mintID,
      ownerTokenAccount.address,
      userTokenAccount.address
    );

    res.status(200).json({ status: true, transfer });
  }
}
export default new TransferNFTController();
