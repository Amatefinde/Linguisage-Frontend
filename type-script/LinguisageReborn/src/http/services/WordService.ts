import $api from "../index.js";
import {IWordData} from "../../types/WordInterface.ts";


interface SearchWordParams {
  query: string;
  context?: string;
}

export default class WordService {
  static async searchWord(word: string, context: string = ""): Promise<IWordData> {
    const params: SearchWordParams = {
      query: word,
    };

    if (!!context) {
      console.log("Контекст для слова отправляется тоже!")
      params[`context`] = context;
    }

    return $api.get("senses/search", { params }).then((response) => {
      return response.data;
    });
  }

  // static async getMySenses() {
  //   return $api.get("words/users/senses").then((response) => {
  //     return response.data;
  //   });
  // }

  // static async addSenseToMe(images_id, sense_id, literature_id) {
  //   try {
  //     console.log("Сенс:", sense_id);
  //     const data = {
  //       f_sense_id: sense_id,
  //       f_images_id: images_id,
  //     };
  //     if (literature_id) {
  //       data["literature_id"] = literature_id
  //     }
  //     const response = await $api.post("words/users/senses", data);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
