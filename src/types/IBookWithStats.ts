import IBook from "./IBook.ts";

export interface IBookStats {
    word_learned: number;   // Количество слов, выученных пользователем
    word_in_process: number; // Количество слов, которые находятся в процессе изучения
    word_in_queue: number;   // Количество слов в очереди на изучение
    word_total: number;      // Общее количество слов в книге
}

export default interface IBookWithStats extends IBook {
    stats: IBookStats;
}
