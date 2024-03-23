import $api from "../index.js";
import {IUserTrainContent} from "../../types/UserSensesInterface";

export default class TrainService {
  // static async addAnswer(f_sense_id, isCorrect) {
  //   const bodyParams = {
  //     f_sense_id: f_sense_id,
  //     is_correct: isCorrect,
  //   };
  //   return $api.post("/training", bodyParams).then((response) => {
  //     return response.data;
  //   });
  // }

  static async getTrain(exerciseNumber: number): Promise<IUserTrainContent> {
    const params = { exercise_number: exerciseNumber };
    return $api.get("/training", { params }).then((response) => {
      return response.data;
    });
  }
}
