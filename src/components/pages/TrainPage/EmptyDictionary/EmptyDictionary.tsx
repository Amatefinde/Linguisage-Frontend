import React, {useState} from 'react';
import classes from "./EmptyDictionary.module.css"
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import {useNavigate} from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddWord from "../../../blocks/AddWord/AddWord.tsx";
import ModalJoyStyled from "../../../ui/ModalJoyStyled/ModalJoyStyled.tsx";
import {HomeRounded} from "@mui/icons-material";


const EmptyDictionary: React.FC = () => {
    const navigate = useNavigate();
    const [isAddWordOpen, setIsAddWordOpen] = useState<boolean>(false)

    return (
        <>
            <ModalJoyStyled open={isAddWordOpen} onClose={() => setIsAddWordOpen(false)}>
                <AddWord onClose={() => setIsAddWordOpen(false)}/>
            </ModalJoyStyled>
            <div className={classes.wrapper}>
                <Typography level={"title-lg"} fontSize={"xl2"}>
                    There are no suitable words in your dictionary to start training
                </Typography>
                <ButtonGroup size={"lg"} variant={"soft"} sx={{borderRadius: 20}}>
                    <Button onClick={() => navigate("/home")} startDecorator={<HomeRounded/>}>Back to home</Button>
                    <Button onClick={() => setIsAddWordOpen(true)} startDecorator={<AddRoundedIcon/>}>Add words</Button>
                </ButtonGroup>
            </div>
        </>
    );
};

export default EmptyDictionary;