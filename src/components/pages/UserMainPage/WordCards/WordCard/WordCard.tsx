import React from "react";
import classes from "./WordCard.module.css";
import OneSizeBlock from "../OneSizeBlock/OneSizeBlock.js";
import {IUserSense} from "../../../../../types/UserSensesInterface";
import Typography from "@mui/joy/Typography";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Sheet from "@mui/joy/Sheet";
import {WrapText} from "@mui/icons-material";
import ChipSheet from "../../../DictionaryPage/SenseCard/ChipSheet/ChipSheet.tsx";

interface WordCardInterface {
    sense: IUserSense;
}

const WordCard: React.FC<WordCardInterface> = ({sense}) => {
    return (
        <OneSizeBlock>
            <ChipSheet sense={sense} variant={"plain"}/>
            <Typography level="h2">{sense.word.word}</Typography>
            <Divider inset="none" />
            {sense.definition}
            {sense.definition.length < 100 && !!sense.examples.length && sense.examples?.[0]?.example?.length + sense.definition.length < 147 && (
                <>
                    <Divider inset="none" />
                    {/*<WrapText>*/}
                    <div dangerouslySetInnerHTML={{__html: sense.examples?.[0]?.html_example}}></div>
                    {/*</WrapText>*/}
                </>
            )}
        </OneSizeBlock>
    );
};

export default WordCard;
