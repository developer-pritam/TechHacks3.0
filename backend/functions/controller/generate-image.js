import OpenAiService from "../services/openai-service.js";
import FirebaseService from "../services/firebase-service.js";

class GenerateImageController {
  async getImageUri(req, res) {
    try {
      const text = req.body["text-prompt"];
      if (text == "Testing") {
        return res.status(200).json({
          status: true,
          message: "Image generated successfully",
          downnloadUrl:
            "https://firebasestorage.googleapis.com/v0/b/fir-project-82e95.appspot.com/o/156f27a0-287a-4368-b472-162a94f2a768.png?alt=media&token=3213e0dc-f562-4a99-a80d-9ac1df1fdb24",
        });
      }
      const iscontentFiltered = await OpenAiService.iscontentFiltered(text);
      if (!iscontentFiltered) {
        return res
          .status(400)
          .send({ status: false, message: "Content is not suitable for NFT" });
      }

      const imageUri = await OpenAiService.getImages(text);
      const downnloadUrl = await FirebaseService.uploadImage(imageUri);

      return res.status(200).send({
        status: true,
        message: "Image generated successfully",
        downnloadUrl,
      });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  }
}
export default new GenerateImageController();
