import $api from "../http";
import cleanText from "../utils/removePunctuationMarks";

export default class WordService {
  static async getWord(word, context = "") {
    word = cleanText(word);
    const params = {
      query: word,
    };

    if (!!context) {
      params[context] = context;
    }

    return $api.get("words/senses", { params }).then((response) => {
      return response.data;
    });
  }
}
