import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

class OpenAiService {
  async getImages(prompt) {
    let response;
    try {
      response = await openai.createImage({
        prompt: prompt + ", generate nft image",
        n: 1,
        size: "256x256",
      });
    } catch (error) {
      console.log("OpenAi error: " + error.message);
      throw "Something went wrong, OpenAI API error";
    }

    const images = response.data.data[0].url;

    return images;
  }

  async iscontentFiltered(text) {
    const data = JSON.stringify({
      model: "content-filter-alpha",
      prompt: `<|endoftext|>${text}\n--\nLabel:`,
      max_tokens: 1,
      temperature: 0,
      top_p: 0,
      logprobs: 10,
      user: "1",
    });

    const config = {
      method: "post",
      url: "https://api.openai.com/v1/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      data: data,
    };

    let res;
    try {
      res = await axios(config);
      // console.log(res.data);
      return res.data.choices[0].text == 0 ? true : false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
export default new OpenAiService();
