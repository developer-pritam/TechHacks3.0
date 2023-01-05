import admin from "../firebase-admin.js";
import axios from "axios";
import fs from "fs";
const bucket = admin.storage().bucket("gs://fir-project-82e95.appspot.com/");
import { v4 as uuidv4 } from "uuid";
import os from "os";
const tempDir = os.tmpdir();

class FirebaseService {
  async downloadImage(url, filepath) {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    return new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream(filepath))
        .on("error", reject)
        .once("close", () => resolve(filepath));
    });
  }
  async uploadImage(imageUri) {
    return new Promise(async (resolve, reject) => {
      const uuid = uuidv4();
      const filename = `${tempDir}/${uuid}.png`;
      await this.downloadImage(imageUri, filename);
      bucket.file(`${uuid}.png`);
      bucket.upload(filename, function (err, file, apiResponse) {
        if (err) reject(err);
        file.makePublic(function (err, apiResponse) {
          if (err) reject(err);
          console.log(file.publicUrl());
          resolve(file.publicUrl());
        });
      });
    });
  }
}
export default new FirebaseService();
