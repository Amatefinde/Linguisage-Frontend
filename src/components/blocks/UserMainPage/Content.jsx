import React from 'react';
import classes from "./Content.module.css";
import LastBook from "./LastBook/LastBook";
import UploadBooks from "./UploadBooks/UploadBooks";
import TrainCard from "./TrainCard/TrainCard";
import OneSizeBlock from "./OneSizeBlock/OneSizeBlock";
import WordCard from "./WordCard/WordCard";

const last_opened_book = {
    id: 0,
    title: "Дизайн для чайников",
    author: "Сергей Павлов",
    bookCover: "https://www.tarakans.com/static/images/78234", /*Ссылка на изобраение обложки книги*/
    pagesRead: 42,
    pagesTotal: 324,
    wordTotal: 162,         /*Общее количество слов добавленных из этой книги*/
    wordLearned: 20,        /*Слов добавленных из этой книги, которые уже выучены*/
    wordInProcess: 24,      /*Слов добавленных из этой книги, которые в процессе изучения*/
    wordInQueue: 118,       /*Слов добавленных из этой книги, которые пока в очереди*/
}

const user_word = {

}


const Content = () => {
    return (<section className={classes.Container}>
        <div className={classes.LastBook}>
            <LastBook book={last_opened_book}/>
        </div>
        <div className={classes.UploadBooks}>
            <UploadBooks/>
        </div>
        <div className={classes.StartTrain}>
            <TrainCard/>
        </div>
        <WordCard/>
        <WordCard/>
        <WordCard/>
        <WordCard/>
    </section>);
};

export default Content;