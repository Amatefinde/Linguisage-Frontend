import React, {useEffect, useState} from 'react';
import classes from "./TrainingComplete.module.css"
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {HomeRounded} from "@mui/icons-material";
import ButtonGroup from "@mui/joy/ButtonGroup";
import {useNavigate} from "react-router-dom";
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import TrainService from "../../../../http/services/TrainService.ts";
import {IUserSense} from "../../../../types/UserSensesInterface.ts";
import MasteredSenses from "./MasteredSenses/MasteredSenses.tsx";
import Sheet from "@mui/joy/Sheet";
import LoaderForPage from "../../../ui/LoaderForPage/LoaderForPage.tsx";

const TrainingComplete: React.FC = () => {
    const navigate = useNavigate();
    const [masteredSenses, setMasteredSenses] = useState<IUserSense[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        async function calculateProgress() {
            setIsLoading(true)
            try {
                // todo: change mock get train to calculate
                const fetchedMasteredSenses = await TrainService.calculate();
                setMasteredSenses(fetchedMasteredSenses.senses)
            } catch (e) {
                console.log("Во время подсчета прогресса произошла ошибка", e)
            }
            setIsLoading(false)
        }
        calculateProgress()
    }, []);

    return (
        isLoading ? <LoaderForPage/> :
        <div className={classes.wrapper}>
            <Typography level={"title-lg"} color={"primary"} fontSize={"xl3"}>
                Congrats! Your training is complete
            </Typography>
            {masteredSenses.length > 0 && <MasteredSenses senses={masteredSenses}/>}
            <ButtonGroup size={"lg"} variant={"soft"} color={"primary"} sx={{borderRadius: 20}}>
                <Button onClick={() => navigate("/home")}  startDecorator={<HomeRounded/>}>Back to home</Button>
                <Button onClick={() => window.location.reload()} startDecorator={<AutoAwesomeRoundedIcon/>}>Next training</Button>
            </ButtonGroup>
        </div>
    );
};

export default TrainingComplete;