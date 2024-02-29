import $api from "../index.js";
import cleanText from "../../utils/removePunctuationMarks";

export default class WordService {
  static async getWord(word, context = "") {
    word = cleanText(word);
    const params = {
      query: word,
    };

    if (!!context) {
      params["context"] = context;
    }

    return $api.get("words/senses", { params }).then((response) => {
      return response.data;
    });
  }

  static async getMySenses() {
    return $api.get("words/users/senses").then((response) => {
      return response.data;
    });
  }

  static async addSenseToMe(images_id, sense_id, literature_id) {
    try {
      console.log("Сенс:", sense_id);
      const data = {
        f_sense_id: sense_id,
        f_images_id: images_id,
      };
      if (literature_id) {
        data["literature_id"] = literature_id
      }
      const response = await $api.post("words/users/senses", data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
