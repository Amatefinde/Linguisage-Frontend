import React, { useContext, useEffect, useState } from "react";
import classes from "./Home.module.css";
import LastBook from "./LastBook/LastBook";
import UploadBooks from "./UploadBooks/UploadBooks";
import TrainCard from "./TrainCard/TrainCard";
import OneSizeBlock from "./OneSizeBlock/OneSizeBlock";
import WordCard from "./WordCard/WordCard";
import Header from "../../Blocks/Header/Header";
import MotivationBlock from "./MotivationBlock/MotivationBlock";
import BookService from "../../../services/BookService";
import { ApplicationContext } from "../../../App";
import UnAuthorized from "../../Blocks/UnAuthorized/UnAuthorized";

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

const user_word = {
  content: "Destroy",
  meaning:
    "destroy something to damage something so badly that it no longer exists, works, etc.",
  progress: 0.36,
};

const Home = () => {
  const [lastOpenedBook, setLastOpenedBook] = useState(
    last_opened_book_template,
  );
  const { isLogged, setIsLogged } = useContext(ApplicationContext);
  const [isLastBookLoaded, setIsLastBookLoaded] = useState(false);

  useEffect(() => {
    BookService.get_last_book()
      .then((e) => {
        if (e === null) {
          setIsLastBookLoaded(true);
        } else {
          setLastOpenedBook({
            ...lastOpenedBook,
            title: e.title,
            bookCover: e.cover.replace("\\", "/").replace("\\", "/"),
          });
        }
      })
      .catch((e) => {
        console.log("Ошибка:", e);
      });
  }, []);

  const home = (
    <>
      <Header />
      <div
        className={[
          classes.parent,
          isLastBookLoaded && classes.smoothAppear,
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
              <UploadBooks />
            </div>
            <div className={classes.StartTrain}>
              <TrainCard />
            </div>
            <WordCard user_word={user_word} />
            <WordCard user_word={user_word} />
            <WordCard user_word={user_word} />
            <WordCard user_word={user_word} />
          </section>
          <div className={classes.otherContent}>
            <MotivationBlock>
              Павел Воля выучил английский, когда ему было пять, а тебе сто..
            </MotivationBlock>
            <div className={classes.brandMark}>designed by ??????</div>
          </div>
        </div>
      </div>
    </>
  );

  return isLogged ? home : <UnAuthorized />;
};

export default Home;
