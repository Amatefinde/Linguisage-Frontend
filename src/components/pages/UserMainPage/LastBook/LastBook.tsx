import React, {useEffect, useState} from "react";
import classes from "./LastBook.module.css";
import SkeletonButton from "../../../ui/Buttons/SkeletonButton/SkeletonButton";
import BookService from "../../../../http/services/BookService";
import ProgressCircle from "../../../blocks/ProgresCircle/ProgressCircle";
import IBookWithStats from "../../../../types/IBookWithStats.ts";


interface ILastBookProps {
    setIsLastBookLoading: (value: boolean) => void;
}

const LastBook: React.FC<ILastBookProps> = ({setIsLastBookLoading}) => {

    const [book, setBook] = useState<IBookWithStats | undefined | null>(undefined)
    useEffect(() => {
        setIsLastBookLoading(true)
        BookService.getLastBook()
        .then(book => setBook(book))
        .catch()
        .finally(() => setIsLastBookLoading(false))
    }, []);


    const read = `Прочитано:\n${60}/${240}`;


    // const navigate = useNavigate()
    const openBook = () => {
        // localStorage.setItem("currentLiteratureID", String(book.id))
        // navigate("/reader")
    }
    let component = null;
    if (book) {
        component = (
            <>
                <section className={classes.ReadSection}>
                    <div className={classes.BookCover} onClick={openBook}>
                        <img
                            className={classes.image}
                            src={book?.cover}
                            alt="Book Cover"
                            // onLoad={handleImageLoad}
                        />
                    </div>
                    <div className={classes.BookInfo}>
                        <div className={classes.TitleAndAuthor}>
                            <div className={classes.Title}>
                                {book.title.length > 70
                                    ? book.title.slice(0, 70) + "..."
                                    : book.title}
                            </div>
                        </div>
                        <div className={classes.ReadInfo}>
                            <div className={classes.pagesRead}>{read}</div>
                        </div>
                    </div>
                </section>

                <section className={classes.TrainSection}>
                    <ProgressCircle
                        success={book.stats.word_learned}
                        in_process={book.stats.word_in_process}
                        total={book.stats.word_total}
                    />
                    <div className={classes.InfoAndButton}>
                        <div className={classes.Info}>
                            <div className={classes.IndicatorAndText}>
                                <div
                                    className={classes.Circle}
                                    style={{background: "#92CE7D"}}
                                ></div>
                                <div className={classes.TextForIndicator}>
                                    {book.stats.word_learned} learned
                                </div>
                            </div>
                            <div className={classes.IndicatorAndText}>
                                <div
                                    className={classes.Circle}
                                    style={{background: "#FBC63F"}}
                                ></div>
                                <div className={classes.TextForIndicator}>
                                    {book.stats.word_in_process} in the process
                                </div>
                            </div>
                            <div className={classes.IndicatorAndText}>
                                <div
                                    className={classes.Circle}
                                    style={{background: "#DFDFDF"}}
                                ></div>
                                <div className={classes.TextForIndicator}>
                                    {book.stats.word_in_queue} in the queue
                                </div>
                            </div>
                        </div>
                        <SkeletonButton>Train</SkeletonButton>
                    </div>
                </section>
            </>
        );
    }


    return book && <section className={classes.LastBook}>{component}</section>;
};

export default LastBook;
