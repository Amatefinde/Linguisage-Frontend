import $api from "../http";

export default class BookService {
    static async get_last_book(){
        return $api.get("/literature/last")
            .then(response => response.data)
    }
}
