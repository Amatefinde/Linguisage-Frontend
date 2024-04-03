import {useRef, useState} from "react";
import PopUpUpload from "./PopUpUpload/PopUpUpload";
import UploadWidget from "./UploadWidget/UploadWidget";
import ModalJoyStyled from "../../../ui/ModalJoyStyled/ModalJoyStyled";
import BookLoading from "./BookLoading/BookLoading";


const UploadBooksContainer = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileLoadPercent, setFileLoadPercent] = useState<null | number>(null);
    const hiddenFileInput = useRef(null);

    return (
        <>
            <ModalJoyStyled
                open={open}
                onClose={() => {
                    setOpen(false)
                    hiddenFileInput.current.value = "";
                }}
            >
                <PopUpUpload
                    file={file}
                    fileName={fileName}
                    setFileName={setFileName}
                    hiddenFileInput={hiddenFileInput}
                    setIsModalActive={setOpen}
                    setFileLoadPercent={setFileLoadPercent}
                />
            </ModalJoyStyled>

            {typeof fileLoadPercent == "number" ? (
                <BookLoading fileLoadPercent={fileLoadPercent}/>
            ) : (
                <UploadWidget
                    setIsModalActive={setOpen}
                    setFile={setFile}
                    setFileName={setFileName}
                    hiddenFileInput={hiddenFileInput}
                />
            )}
        </>
    );
};

export default UploadBooksContainer;
