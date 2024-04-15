import React from 'react';
import Typography from "@mui/joy/Typography";
import {IUserSense} from "../../../../../types/UserSensesInterface.ts";
import {Card, Stack} from "@mui/joy";
import WordCard from "../../../UserMainPage/WordCards/WordCard/WordCard.tsx";
import classes from "./MasteredSenses.module.css"
import CardContent from "@mui/joy/CardContent";

interface IMasteredSensesProps {
    senses: IUserSense[];
}

const MasteredSenses: React.FC<IMasteredSensesProps> = ({senses}) => {
    return (
        <Card sx={{borderRadius: 20, p: 3, background: "white"}} variant={"plain"}>
            <Typography level={"title-md"} fontSize={"xl2"}>
                You have mastered these words:
            </Typography>
            <CardContent sx={{display: "flex", justifyContent: "center"}} className={senses.length > 4 ? classes.senses : undefined} orientation={"horizontal"} >
                <div className={classes.masteredSensesWrapper}>
                    {senses.map(sense => <WordCard sense={sense} variant={"soft"}/>)}
                </div>
            </CardContent>
        </Card>
    );
};

export default MasteredSenses;