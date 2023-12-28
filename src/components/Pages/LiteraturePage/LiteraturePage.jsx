import React, { createContext, useContext, useEffect, useState } from "react";
import Book from "../../Blocks/Book/Book";
import Header from "../../Blocks/Header/Header";
import classes from "./Literature.module.css";
import BookService from "../../../services/BookService";
import Loading from "../Loading/Loading";

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

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        {isLoading ? (
          <div className={classes.loading}>
            <Loading />
          </div>
        ) : (
          <div className={classes.wrapper}>{books}</div>
        )}
      </div>
    </>
  );
};

export default LiteraturePage;
