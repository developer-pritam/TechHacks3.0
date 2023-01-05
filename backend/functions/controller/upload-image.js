import firebaseService from "../services/firebase-service.js";
class UploadImageController {
  async uploadImage(req, res) {
    const { imageUri } = req.body;
    const downloadUri = await firebaseService.uploadImage(imageUri);
    res.status(200).json({ status: true, downloadUri });
  }
}
export default new UploadImageController();
