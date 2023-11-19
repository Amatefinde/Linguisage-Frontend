import React from "react";
import classes from "./LastBook.module.css";
import ProgressCircle from "../../../Blocks/ProgresCircle/ProgressCircle";
import YellowButton from "../../../ui/Buttons/YellowButton/YellowButton";
import SkeletonButton from "../../../ui/Buttons/Button/SkeletonButton";

const LastBook = ({ book, isLastBookLoaded, setIsLastBookLoaded }) => {
  const read = `Прочитано:\n${book.pagesRead}/${book.pagesTotal}`;
  console.log(book.bookCover);

  const handleImageLoad = () => {
    console.log("Наруто тут");
    setIsLastBookLoaded(true);
  };

  book = (
    <>
      <section className={classes.ReadSection}>
        <div className={classes.BookCover}>
          <img src={book.bookCover} alt="Book Cover" onLoad={handleImageLoad} />
        </div>
        <div className={classes.BookInfo}>
          <div className={classes.TitleAndAuthor}>
            <div className={classes.Title}>{book.title}</div>
            <div className={classes.Author}>{book.author}</div>
          </div>
          <div className={classes.ReadInfo}>
            <div className={classes.pagesRead}>{read}</div>
          </div>
        </div>
      </section>

      <section className={classes.TrainSection}>
        <ProgressCircle
          green={book.wordLearned}
          yellow={book.wordInProcess}
          total={book.wordTotal}
        />
        <div className={classes.InfoAndButton}>
          <div className={classes.Info}>
            <div className={classes.IndicatorAndText}>
              <div
                className={classes.Circle}
                style={{ background: "#92CE7D" }}
              ></div>
              <div className={classes.TextForIndicator}>
                {book.wordLearned} learned
              </div>
            </div>
            <div className={classes.IndicatorAndText}>
              <div
                className={classes.Circle}
                style={{ background: "#FBC63F" }}
              ></div>
              <div className={classes.TextForIndicator}>
                {book.wordInProcess} in the process
              </div>
            </div>
            <div className={classes.IndicatorAndText}>
              <div
                className={classes.Circle}
                style={{ background: "#DFDFDF" }}
              ></div>
              <div className={classes.TextForIndicator}>
                {book.wordInQueue} in the queue
              </div>
            </div>
          </div>
          <SkeletonButton>Train</SkeletonButton>
        </div>
      </section>
    </>
  );

  return (
    <section
      className={[
        classes.LastBook,
        classes.smoothAppear,
        isLastBookLoaded && classes.appearActive,
      ].join(" ")}
    >
      {book}
    </section>
  );
};

export default LastBook;
