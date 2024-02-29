import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./Book.module.css";
import BookService from "../../../http/services/BookService";
import { ApplicationContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const Book = ({ imgLink, title, id }) => {
  const canvasRef = useRef(null);
  const { currentBookAllPages, setCurrentBookAllPages } =
    useContext(ApplicationContext);
  const navigate = useNavigate();

  const [isDeleted, setIsDeleted] = useState(false);
  const deleteBook = () =>
    BookService.delete_book(id).then(() => setIsDeleted(true));

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 200;
    canvas.height = 288;

    const context = canvas.getContext("2d");

    const img = new Image();
    img.src = imgLink;
    img.onload = () => {
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height,
      );
      const x = canvas.width / 2 - (img.width / 2) * scale;
      const y = canvas.height / 2 - (img.height / 2) * scale;
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };
  }, [imgLink]);

  function toBook() {
    localStorage.setItem("currentLiteratureID", id)
    navigate("/reader")
  }

  const component = (
    <div className={classes.container}>
      <div className={classes.deleteButton} onClick={deleteBook}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="None"
        >
          <path
            d="M8.53125 3.33333H12.4688C12.4687 2.8029 12.2613 2.29419 11.8921 1.91912C11.5229 1.54405 11.0221 1.33333 10.5 1.33333C9.97786 1.33333 9.4771 1.54405 9.10788 1.91912C8.73867 2.29419 8.53125 2.8029 8.53125 3.33333ZM7.21875 3.33333C7.21875 2.44928 7.56445 1.60143 8.17981 0.976311C8.79516 0.351189 9.62976 0 10.5 0C11.3702 0 12.2048 0.351189 12.8202 0.976311C13.4355 1.60143 13.7812 2.44928 13.7812 3.33333H20.3438C20.5178 3.33333 20.6847 3.40357 20.8078 3.5286C20.9309 3.65362 21 3.82319 21 4C21 4.17681 20.9309 4.34638 20.8078 4.4714C20.6847 4.59643 20.5178 4.66667 20.3438 4.66667H18.9604L17.3932 18.4587C17.2825 19.4336 16.8228 20.3331 16.1016 20.9861C15.3804 21.6391 14.4481 21.9999 13.482 22H7.518C6.55194 21.9999 5.61962 21.6391 4.89843 20.9861C4.17724 20.3331 3.71753 19.4336 3.60675 18.4587L2.03962 4.66667H0.65625C0.482202 4.66667 0.315282 4.59643 0.192211 4.4714C0.0691406 4.34638 0 4.17681 0 4C0 3.82319 0.0691406 3.65362 0.192211 3.5286C0.315282 3.40357 0.482202 3.33333 0.65625 3.33333H7.21875ZM4.91006 18.3067C4.98412 18.9565 5.29075 19.5561 5.77161 19.9912C6.25247 20.4264 6.87402 20.6668 7.518 20.6667H13.482C14.126 20.6668 14.7475 20.4264 15.2284 19.9912C15.7093 19.5561 16.0159 18.9565 16.0899 18.3067L17.6387 4.66667H3.36131L4.91006 18.3067ZM8.53125 8C8.7053 8 8.87222 8.07024 8.99529 8.19526C9.11836 8.32029 9.1875 8.48986 9.1875 8.66667V16.6667C9.1875 16.8435 9.11836 17.013 8.99529 17.1381C8.87222 17.2631 8.7053 17.3333 8.53125 17.3333C8.3572 17.3333 8.19028 17.2631 8.06721 17.1381C7.94414 17.013 7.875 16.8435 7.875 16.6667V8.66667C7.875 8.48986 7.94414 8.32029 8.06721 8.19526C8.19028 8.07024 8.3572 8 8.53125 8ZM13.125 8.66667C13.125 8.48986 13.0559 8.32029 12.9328 8.19526C12.8097 8.07024 12.6428 8 12.4688 8C12.2947 8 12.1278 8.07024 12.0047 8.19526C11.8816 8.32029 11.8125 8.48986 11.8125 8.66667V16.6667C11.8125 16.8435 11.8816 17.013 12.0047 17.1381C12.1278 17.2631 12.2947 17.3333 12.4688 17.3333C12.6428 17.3333 12.8097 17.2631 12.9328 17.1381C13.0559 17.013 13.125 16.8435 13.125 16.6667V8.66667Z"
            fill="#D4D4D4"
          />
        </svg>
      </div>
      <div className={classes.bookCover} onClick={toBook}>
        {/*<img*/}
        {/*  src={imgLink}*/}
        {/*  alt={"Here must be book cover"}*/}
        {/*  className={classes.img}*/}
        {/*/>*/}

        <canvas ref={canvasRef}></canvas>
      </div>
      <div className={classes.bookTitle} onClick={toBook}>
        {title}
      </div>
    </div>
  );

  return !isDeleted && component;
};

export default Book;
