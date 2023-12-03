import $api from "../http";

function cleanText(text) {
  text = text.toLowerCase();
  text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  return text;
}

export default class WordService {
  static async getWord(word, context = "") {
    word = cleanText(word);
    const params = {
      word,
    };

    if (!!context) {
      params[context] = context;
    }

    return $api.get("words/meaning", { params }).then((response) => {
      return response.data;
    });
  }
}
