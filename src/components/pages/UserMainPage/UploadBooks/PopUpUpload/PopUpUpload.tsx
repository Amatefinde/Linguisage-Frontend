import React, { useState, useEffect, ChangeEvent } from "react";
import classes from "./PopUpUpload.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Checkbox, FormLabel } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import ButtonGroup from "@mui/joy/ButtonGroup";
import ePub from "epubjs";
import BookService from "../../../../../http/services/BookService";
import ImageWithSmoothLoading from "../../../../ui/ImageWithLoadPlaceholder/ImageWithSmoothLoading";
import removeFilenameExtension from "../../../../../utils/removeFilenameExtension";

interface PopUpUploadProps {
    file: File;
    fileName: string;
    setFileName: (value: string) => void;
    hiddenFileInput: React.RefObject<HTMLInputElement>;
    setIsModalActive: (value: boolean) => void;
    setFileLoadPercent: React.Dispatch<React.SetStateAction<number | "uploaded">>;
}

const PlaceholderCover: React.FC = () => (
    <div className={classes.placeholderCover}>
        <svg width="56" height="80" viewBox="0 0 56 56" fill="none">
            <rect width="56" height="56" rx="8" fill="#F3F4F6"/>
            <path d="M18 20h20v16H18V20zm0-2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V20c0-1.1-.9-2-2-2H18zm10 3a4 4 0 100 8 4 4 0 000-8z" fill="#B0B8C1"/>
        </svg>
        <span>No cover preview</span>
    </div>
);

const PopUpUpload: React.FC<PopUpUploadProps> = ({
                                                     file,
                                                     fileName,
                                                     setFileName,
                                                     hiddenFileInput,
                                                     setIsModalActive,
                                                     setFileLoadPercent,
                                                 }) => {
    const [coverUrl, setCoverUrl] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        const loadCover = async () => {
            if (file?.name?.endsWith(".fb2")) {
                setCoverUrl(null);
                return;
            }
            try {
                // @ts-ignore
                const book = ePub(file);
                const url = await book.coverUrl();
                if (active) setCoverUrl(url || null);
            } catch {
                if (active) setCoverUrl(null);
            }
        };
        loadCover();
        return () => { active = false };
    }, [file]);

    const renderCover = () => (
        file?.name?.endsWith(".fb2")
            ? <PlaceholderCover />
            : (coverUrl
                ? <ImageWithSmoothLoading src={coverUrl} alt="Book cover" />
                : <PlaceholderCover />)
    );

    const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileName(removeFilenameExtension(e.target.value));
    };

    const uploadBook = async () => {
        setIsModalActive(false);
        await BookService.addBook(file, fileName, setFileLoadPercent);
        setFileLoadPercent("uploaded");
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.bookCover}>
                {renderCover()}
            </div>
            <div className={classes.forms}>
                <section className={classes.management}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={fileName}
                            onChange={handleFileNameChange}
                        />
                    </FormControl>
                    <FormControl>
                        <Checkbox label="Automatic text recognition" disabled />
                        <FormHelperText>Only for PDF</FormHelperText>
                    </FormControl>
                </section>
                <ButtonGroup spacing={2}>
                    <Button
                        variant="outlined"
                        color="neutral"
                        onClick={() => {
                            setIsModalActive(false);
                            if (hiddenFileInput.current) hiddenFileInput.current.value = "";
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={uploadBook}
                        variant="solid"
                        color="primary"
                    >
                        Upload
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default PopUpUpload;
