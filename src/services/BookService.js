import $api from "../http";

export default class BookService {
  static async get_last_book() {
    return $api.get("/literature/last").then((response) => response.data);
  }

  static async add_book(book) {
    const formData = new FormData();
    formData.append("file", book);

    return $api.post("/literature", formData).then((response) => response.data);
  }
}
