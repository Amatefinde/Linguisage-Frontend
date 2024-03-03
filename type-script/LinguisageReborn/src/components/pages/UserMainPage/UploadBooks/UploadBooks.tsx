import React, {useEffect, useRef, useState} from "react";
import classes from "./UploadBooks.module.css";
import PopUpUpload from "./PopUpUpload/PopUpUpload";
import Loading from "../../../blocks/Loading/Loading.js";
import UploadWidget from "./UploadWidget/UploadWidget";
import Modal from "../../../ui/Modal/Modal";


const UploadBooks = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null)
    const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
    
    
    async function uploadFile() {
        // try {
        //     setIsModalActive(false);
        //     setIsFileLoading(true);
        //     await BookService.add_book(file);
        // } catch (e) {
        //     console.log("Ошибка при загрузке файла: ", e);
        // } finally {
        //     setIsFileLoading(false);
        // }
    }
    
    return (
        <>
            <Modal showModal={isModalActive} setShowModal={setIsModalActive}>
                <PopUpUpload
                    file={file}
                    fileName={fileName}
                    setFileName={setFileName}
                    callback={uploadFile}
                />
            </Modal>
            {isFileLoading ? (
                <Loading/>
            ) : (
                <UploadWidget
                    setIsModalActive={setIsModalActive}
                    setFile={setFile}
                    setFileName={setFileName}
                />
            )}
        </>
    );
};

export default UploadBooks;
