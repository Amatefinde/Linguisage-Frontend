import React, {useState, ChangeEvent} from "react";
import classes from "./PopUpUpload.module.css";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import {Checkbox, FormLabel} from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import ButtonGroup from "@mui/joy/ButtonGroup";
import ePub, {Book} from "epubjs";

interface PopUpUploadProps {
    file: File;
    fileName: string;
    setFileName: (value: string) => void;
    hiddenFileInput: React.RefObject<HTMLInputElement>;
    setIsModalActive: (value: boolean) => void;
}

const PopUpUpload: React.FC<PopUpUploadProps> = ({
                                                     file,
                                                     fileName,
                                                     setFileName,
                                                     hiddenFileInput,
                                                     setIsModalActive
                                                 }) => {
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    const book: Book = ePub(file);
    
    book.coverUrl().then((cover) => setCoverUrl(cover)).catch(() => setCoverUrl(null));
    
    const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
    };
    
    return (
        <div className={classes.wrapper}>
            <div className={classes.bookCover}>
                {coverUrl && <img src={coverUrl} alt={file.name} className={classes.bookCover}/>}
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
                    <Button variant={"solid"} color="primary">
                        Upload
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default PopUpUpload;
