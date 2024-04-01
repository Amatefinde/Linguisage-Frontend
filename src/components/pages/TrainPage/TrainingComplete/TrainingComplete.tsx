import React, {useEffect} from 'react';
import classes from "./TrainingComplete.module.css"
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {HomeRounded} from "@mui/icons-material";
import ButtonGroup from "@mui/joy/ButtonGroup";
import {useNavigate} from "react-router-dom";
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import TrainService from "../../../../http/services/TrainService.ts";

const TrainingComplete: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        async function calculateProgress() {
            try {
                await TrainService.calculate()
            } catch (e) {
                console.log("Во время подсчета прогресса произошла ошибка", e)
            }
        }
        calculateProgress()
    }, []);

    return (
        <div className={classes.wrapper}>
            <Typography level={"title-lg"} fontSize={"xl2"}>
                Congrats! Your training is complete
            </Typography>
            <ButtonGroup size={"lg"} variant={"soft"} sx={{borderRadius: 20}}>
                <Button onClick={() => navigate("/home")} startDecorator={<HomeRounded/>}>Back to home</Button>
                <Button onClick={() => window.location.reload()} startDecorator={<AutoAwesomeRoundedIcon/>}>Next training</Button>
            </ButtonGroup>
        </div>
    );
};

export default TrainingComplete;