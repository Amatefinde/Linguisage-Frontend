import React, {useEffect, useState} from "react";
import classes from "./LastBook.module.css";
import {useNavigate} from "react-router-dom";
import BookInterface from "../../../../types/BookInterface";
import SkeletonButton from "../../../ui/Buttons/SkeletonButton/SkeletonButton";
import BookService from "../../../../http/services/BookService";
import ProgressCircle from "../../../blocks/ProgresCircle/ProgressCircle.tsx";


const LastBook: React.FC<BookInterface> = () => {
    const mockFieldMixin = {
        wordLearned: 30,
        wordInProcess: 15,
        wordInQueue: 65,
        wordTotal: 110,
    }
    
    const [book, setBook] = useState<BookInterface | undefined | null>(undefined)
    useEffect(() => {
        BookService.get_last_book()
            .then(book => setBook({...book, ...mockFieldMixin}))
    }, []);
  
  
    const read = `Прочитано:\n${60}/${240}`;
    
    
    const navigate = useNavigate()
    const openBook = () => {
        // localStorage.setItem("currentLiteratureID", String(book.id))
        // navigate("/reader")
    }
    
    const component = (
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
                            {book?.title.length > 70
                                ? book?.title.slice(0, 70) + "..."
                                : book?.title}
                        </div>
                    </div>
                    <div className={classes.ReadInfo}>
                        <div className={classes.pagesRead}>{read}</div>
                    </div>
                </div>
            </section>
            
            <section className={classes.TrainSection}>
                <ProgressCircle
                    green={book?.wordLearned}
                    yellow={book?.wordInProcess}
                    total={book?.wordTotal}
                />
                <div className={classes.InfoAndButton}>
                    <div className={classes.Info}>
                        <div className={classes.IndicatorAndText}>
                            <div
                                className={classes.Circle}
                                style={{background: "#92CE7D"}}
                            ></div>
                            <div className={classes.TextForIndicator}>
                                {book?.wordLearned} learned
                            </div>
                        </div>
                        <div className={classes.IndicatorAndText}>
                            <div
                                className={classes.Circle}
                                style={{background: "#FBC63F"}}
                            ></div>
                            <div className={classes.TextForIndicator}>
                                {book?.wordInProcess} in the process
                            </div>
                        </div>
                        <div className={classes.IndicatorAndText}>
                            <div
                                className={classes.Circle}
                                style={{background: "#DFDFDF"}}
                            ></div>
                            <div className={classes.TextForIndicator}>
                                {book?.wordInQueue} in the queue
                            </div>
                        </div>
                    </div>
                    <SkeletonButton>Train</SkeletonButton>
                </div>
            </section>
        </>
    );
    
    return <section className={classes.LastBook}>{component}</section>;
};

export default LastBook;
