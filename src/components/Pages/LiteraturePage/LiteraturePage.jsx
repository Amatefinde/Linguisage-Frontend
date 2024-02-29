import React, { createContext, useContext, useEffect, useState } from "react";
import Book from "../../Blocks/Book/Book";
import Header from "../../Blocks/Header/Header";
import classes from "./Literature.module.css";
import BookService from "../../../http/services/BookService";
import Loading from "../../Blocks/Loading/Loading";

const LiteraturePage = () => {
  const [books, setBooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    BookService.get_book_list().then((books) => {
      setBooks(
        books.map((book, idx) => {
          let { title, cover: imgLink, id } = book;
          imgLink = !!imgLink ? imgLink.replace(/^"|"$/g, "") : imgLink;
          return <Book key={idx} title={title} imgLink={imgLink} id={id} />;
        }),
      );
      setIsLoading(false);
    });
  }, []);

  const not_loaded_literature = <div className={classes.notLiteratureWrapper}><div className={classes.notLiterature}>Looks like you haven't added literature yet</div></div>

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        {isLoading ? (
          <div className={classes.loading}>
            <Loading />
          </div>
        ) : (
            books.length ? <div className={classes.wrapper}>{books}</div> : not_loaded_literature
        )}
      </div>
    </>
  );
};

export default LiteraturePage;
