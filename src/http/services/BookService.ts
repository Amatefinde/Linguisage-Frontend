import $api from "../index";
import BookInterface from "../../types/BookInterface";
import IBookList from "../../types/IBookList.ts";

export default class BookService {
    static async getLastBook(): Promise<BookInterface> {
        return $api.get("/literature/last").then((response) => response.data);
    }
    
    
    static async addBook(book: File,
                         filename: string,
                         setFileLoadPercent: (value: number) => void,
    ) {
        const formData = new FormData();
        formData.append("book", book);
        formData.append("filename", filename);

        return $api.post("/literature", formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setFileLoadPercent(percentCompleted)
                console.log(percentCompleted)
            },
        }).then((response) => response.data);
    }

    static async getBooks(): Promise<IBookList> {
        return $api.get("/literature").then((response) => response.data);
    }
    //
    // static async get_book(id, start_page = 1, end_page = 0) {
    //     const config = {params: {literature_id: id, start_page, end_page}};
    //     return $api.get("/literature", config).then((response) => response.data);
    // }
    //
    // static async delete_book(id) {
    //     const config = {params: {literature_id: id}};
    //     return $api.delete("/literature", config).then((response) => response.data);
    // }
}
