import $api from "../index.js";
import {IWordData} from "../../types/WordInterface.ts";
import {IUserSenses} from "../../types/UserSensesInterface.ts";


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

  static async getMySenses(): Promise<IUserSenses> {
    return $api.get("senses").then((response) => {
      return response.data;
    });
  }

  static async addPublicSenseToMe(fSenseId: number, fWordImageIds: number[], fSenseImageIds: number[] = []) {
    try {
      const data = {
        f_sense_id: fSenseId,
        f_word_image_ids: fWordImageIds,
        f_sense_image_ids: fSenseImageIds,
      };

      // if (literature_id) {
      //   data["literature_id"] = literature_id
      // }

      const response = await $api.post("senses/public", data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteSense(senseId: number): Promise<void> {
    try {

      // if (literature_id) {
      //   data["literature_id"] = literature_id
      // }

      const response = await $api.delete(`senses/${senseId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
