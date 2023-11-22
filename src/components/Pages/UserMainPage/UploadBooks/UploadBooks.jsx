import React, { useEffect, useRef, useState } from "react";
import classes from "./UploadBooks.module.css";
import Modal from "../../../ui/Modal/Modal";
import PopUpUpload from "./PopUpUpload/PopUpUpload";
import useDrawFirstPDFPage from "../../../../hooks/useDrawFirstPDFPage";
import BookService from "../../../../services/BookService";
import Loading from "../../Loading/Loading";
import UploadWidget from "./UploadWidget/UploadWidget";

const UploadBooks = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const canvasRef = useRef();

  async function uploadFile() {
    try {
      setIsModalActive(false);
      setIsFileLoading(true);
      await BookService.add_book(file);
    } catch (e) {
      console.log("Ошибка при загрузке файла: ", e);
    } finally {
      setIsFileLoading(false);
    }
  }

  return (
    <>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <PopUpUpload
          file={file}
          setFile={setFile}
          canvasRef={canvasRef}
          callback={uploadFile}
        />
      </Modal>
      {isFileLoading ? (
        <Loading />
      ) : (
        <UploadWidget
          setIsModalActive={setIsModalActive}
          setFile={setFile}
          canvasRef={canvasRef}
        />
      )}
    </>
  );
};

export default UploadBooks;
