import $api from "../index";

export default class BookService {
    static async get_last_book() {
        return $api.get("/literature/last").then((response) => response.data);
    }

    static async add_book(book) {
        const formData = new FormData();
        formData.append("file", book);

        return $api.post("/literature", formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log("Загруженный процент:", percentCompleted);
                // Update your UI with the upload progress
            },
        }).then((response) => response.data);
    }

    static async get_book_list(book) {
        return $api.get("/literature/list").then((response) => response.data);
    }

    static async get_book(id, start_page = 1, end_page = 0) {
        const config = {params: {literature_id: id, start_page, end_page}};
        return $api.get("/literature", config).then((response) => response.data);
    }

    static async delete_book(id) {
        const config = {params: {literature_id: id}};
        return $api.delete("/literature", config).then((response) => response.data);
    }
}
