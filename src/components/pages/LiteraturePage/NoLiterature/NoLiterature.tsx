import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import classes from "./NoLiterature.module.css"
import Typography from "@mui/joy/Typography";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import {useNavigate} from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {HomeRounded} from "@mui/icons-material";
import {styled} from '@mui/joy';
import PopUpUpload from "../../UserMainPage/UploadBooks/PopUpUpload/PopUpUpload.tsx";
import ModalJoyStyled from "../../../ui/ModalJoyStyled/ModalJoyStyled.tsx";
import SendIcon from '@mui/icons-material/Send';
import removeFilenameExtension from "../../../../utils/removeFilenameExtension.ts";

const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
`;


const NoLiterature: React.FC = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const hiddenFileInput = useRef(null);
    const [fileLoadPercent, setFileLoadPercent] = useState<number | "uploaded">();

    useEffect(() => {
        if (fileLoadPercent === "uploaded") {
            window.location.reload();
        }
    }, [fileLoadPercent]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fileUploaded = event.target.files?.[0];
        if (fileUploaded) {
            setIsModalActive(true);
            setFile(fileUploaded);
            setFileName(removeFilenameExtension(fileUploaded.name));
        }
    };

    return (
        <>
            <ModalJoyStyled
                open={isModalActive}
                onClose={() => {
                    setIsModalActive(false)
                    hiddenFileInput.current.value = "";
                }}
            >
                <PopUpUpload
                    file={file}
                    fileName={fileName}
                    setFileName={setFileName}
                    hiddenFileInput={hiddenFileInput}
                    setIsModalActive={setIsModalActive}
                    setFileLoadPercent={setFileLoadPercent}
                />
            </ModalJoyStyled>

            <div className={classes.wrapper}>
                <Typography level={"title-lg"} fontSize={"xl2"}>
                    There are no literature in your library
                </Typography>
                <ButtonGroup size={"lg"} variant={"soft"} sx={{borderRadius: 20}}>
                    <Button onClick={() => navigate("/home")} startDecorator={<HomeRounded/>}>Back to home</Button>
                    {typeof fileLoadPercent === "number"
                        ? <Button loading loadingPosition="end" endDecorator={<SendIcon/>}>
                            Loading {fileLoadPercent}%
                        </Button>
                        : <Button startDecorator={<AddRoundedIcon/>} role={undefined} component={"label"} >
                            Add literature
                            <VisuallyHiddenInput type="file" onChange={handleChange} ref={hiddenFileInput}/>
                        </Button>
                    }



                </ButtonGroup>
            </div>
        </>
    );
};

export default NoLiterature;