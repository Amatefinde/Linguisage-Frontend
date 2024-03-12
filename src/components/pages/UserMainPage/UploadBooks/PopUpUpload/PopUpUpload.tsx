import React, {useState, ChangeEvent} from "react";
import classes from "./PopUpUpload.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import {Checkbox, FormLabel} from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import ButtonGroup from "@mui/joy/ButtonGroup";
import ePub, {Book} from "epubjs";
import BookService from "../../../../../http/services/BookService";
import ImageWithSmoothLoading from "../../../../ui/ImageWithLoadPlaceholder/ImageWithSmoothLoading";

interface PopUpUploadProps {
    file: File;
    fileName: string;
    setFileName: (value: string) => void;
    hiddenFileInput: React.RefObject<HTMLInputElement>;
    setIsModalActive: (value: boolean) => void;
    setFileLoadPercent: (value: number | null) => void;
}

const PopUpUpload: React.FC<PopUpUploadProps> = ({
                                                     file,
                                                     fileName,
                                                     setFileName,
                                                     hiddenFileInput,
                                                     setIsModalActive,
                                                     setFileLoadPercent,
                                                 }) => {
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    let image;
    if (file?.name?.endsWith(".fb2")) {
        image = <div className={classes.bookCover}>
            Sorry, but cover preview for fb2 books not supported yet
        </div>
    } else {
        // @ts-ignore
        const book: Book = ePub(file);
        book.coverUrl().then((cover) => setCoverUrl(cover)).catch(() => setCoverUrl(null));
        image = coverUrl && <ImageWithSmoothLoading src={coverUrl} alt={"Here should be cover, but something went wrong"}/>
    }
    
    const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
    };
    
    async function upload_book() {
        setIsModalActive(false)
        await BookService.add_book(file, fileName, setFileLoadPercent)
        setFileLoadPercent(null)
    }
    
    
    return (
        <div className={classes.wrapper}>
            <div className={classes.bookCover}>
                {image}
            </div>
            <div className={classes.forms}>
                <section className={classes.management}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input value={file?.name && fileName} onChange={handleFileNameChange}/>
                    </FormControl>
                    <FormControl>
                        <Checkbox label="Automatic text recognition" disabled/>
                        <FormHelperText>Only for PDF</FormHelperText>
                    </FormControl>
                </section>
                <ButtonGroup spacing={2}>
                    <Button
                        variant={"outlined"}
                        color="neutral"
                        onClick={() => {
                            setIsModalActive(false);
                            if (hiddenFileInput.current) {
                                hiddenFileInput.current.value = "";
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={upload_book} variant={"solid"} color="primary">
                        Upload
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default PopUpUpload;
