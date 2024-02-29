import React, {useContext, useEffect, useState} from "react";
import classes from "./Home.module.css";
import LastBook from "./LastBook/LastBook";
import UploadBooks from "./UploadBooks/UploadBooks";
import TrainCard from "./TrainCard/TrainCard";
import OneSizeBlock from "./OneSizeBlock/OneSizeBlock";
import WordCard from "./WordCard/WordCard";
import Header from "../../Blocks/Header/Header";
import MotivationBlock from "./MotivationBlock/MotivationBlock";
import BookService from "../../../http/services/BookService";
import {ApplicationContext} from "../../../App";
import UnAuthorized from "../../Blocks/UnAuthorized/UnAuthorized";
import TrainService from "../../../http/services/TrainService";
import words from "./WordCard/DifficultWords";
import Loading from "../../Blocks/Loading/Loading";

const last_opened_book_template = {
    id: 0,
    title: "",
    author: "",
    bookCover:
        "https://www.tarakans.com/static/images/78234" /*Ссылка на изобраение обложки книги*/,
    pagesRead: 42,
    pagesTotal: 324,
    wordTotal: 162 /*Общее количество слов добавленных из этой книги*/,
    wordLearned: 60 /*Слов добавленных из этой книги, которые уже выучены*/,
    wordInProcess: 24 /*Слов добавленных из этой книги, которые в процессе изучения*/,
    wordInQueue: 118 /*Слов добавленных из этой книги, которые пока в очереди*/,
};


const Home = () => {
    const [lastOpenedBook, setLastOpenedBook] = useState(
        last_opened_book_template,
    );
    const {isLogged, setIsLogged} = useContext(ApplicationContext);
    const [isLastBookLoaded, setIsLastBookLoaded] = useState(false);
    const [problemWords, setProblemWords] = useState([])
    const [isProblemWordsLoaded, setIsProblemWordsLoaded] = useState(false)

    useEffect(() => {
        BookService.get_last_book()
            .then((e) => {
                if (e !== null) {
                    setLastOpenedBook({
                        ...lastOpenedBook,
                        title: e.literature.title,
                        id: e.literature.id,
                        bookCover: e.literature.cover.replace("\\", "/").replace("\\", "/"),
                        wordLearned: e.stats.complete,
                        wordTotal: e.stats.total,
                        wordInProcess: e.stats.in_process,
                        wordInQueue: e.stats.in_queue,

                    });
                }
            })
            .catch((e) => {
                console.log("Ошибка:", e);
            })
            .finally(e => {
                setIsLastBookLoaded(true)
            });
    }, []);


    useEffect(() => {
        TrainService.getTrain(4)
            .then(e => {
                setProblemWords([...e, ...words].slice(0, 4))
            })
            .catch(e => {
                console.log("Ошибка:", e);
                setProblemWords(words)
            })
            .finally(e => {
                setIsProblemWordsLoaded(true)
            })
    }, []);

    const content = <div
        className={[
            classes.parent,
            classes.smoothAppear,
        ].join(" ")}
    >
        <div className={classes.screen}>
            {!!lastOpenedBook.title && (
                <LastBook
                    book={lastOpenedBook}
                    isLastBookLoaded={isLastBookLoaded}
                    setIsLastBookLoaded={setIsLastBookLoaded}
                />
            )}
            <section className={classes.Container}>
                <div className={classes.UploadBooks}>
                    <UploadBooks/>
                </div>
                <div className={classes.StartTrain}>
                    <TrainCard/>
                </div>
                {problemWords.map(e => <WordCard key={e.id} sense={e}/>)}
            </section>
            <div className={classes.otherContent}>
                <MotivationBlock>
                    Павел Воля выучил английский, когда ему было пять, а тебе сто..
                </MotivationBlock>
                <div className={classes.brandMark}>designed by ??????</div>
            </div>
        </div>
    </div>

    const home = (
        <>
            <Header/>
            {(isLastBookLoaded && isProblemWordsLoaded) ? content : <Loading/>}

        </>
    );

    return isLogged ? home : <UnAuthorized/>;
};

export default Home;
