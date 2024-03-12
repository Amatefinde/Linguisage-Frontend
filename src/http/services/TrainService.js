import $api from "../index.js";

export default class TrainService {
  static async addAnswer(f_sense_id, isCorrect) {
    const bodyParams = {
      f_sense_id: f_sense_id,
      is_correct: isCorrect,
    };
    return $api.post("/training", bodyParams).then((response) => {
      return response.data;
    });
  }

  static async getTrain(number) {
    const params = { number };
    return $api.get("/training", { params }).then((response) => {
      return response.data;
    });
  }
}
