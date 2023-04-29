
import formidable from ("formidable-serverless");
import firebaseService from "../services/firebase-service.js";
class UploadImageController {
  async uploadImage(req, res) {
    console.log(files, "TTTTTTT");
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      const filePath = files.image.path;

      const url = firebaseService.uploadImageFromStorage(filePath);
      res.status(200).json({ status: true, downloadUri: url, message: "Image Uploaded Successfully" });

    });
    // console.log(req.body);
    // res.status(200).json({ status: true, message: "Image Uploaded Successfully" });
  }
}
export default new UploadImageController();