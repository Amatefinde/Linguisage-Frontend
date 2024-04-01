import React, {useEffect, useState} from 'react';
import {IUserSense} from "../../../../../../types/UserSensesInterface.ts";
import {trainStageType} from "../../../TrainPage.tsx";
import IReview from "../../../../../../types/IReview.ts";
import TrainService from "../../../../../../http/services/TrainService.ts";
import LoaderForPage from "../../../../../ui/LoaderForPage/LoaderForPage.tsx";
import classes from "./ReviewSentence.module.css"
import {Card, LinearProgress} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import {ProgressBar} from "react-loader-spinner";
import {OverridableStringUnion} from "@mui/types";
import {ColorPaletteProp} from "@mui/joy/styles/types";
import {LinearProgressPropsColorOverrides} from "@mui/joy/LinearProgress/LinearProgressProps";

interface IReviewSentenceExerciseProps {
    sense: IUserSense;
    sentence: string;
    setCurrentSenseIndex: React.Dispatch<React.SetStateAction<number>>;
    setStage: React.Dispatch<React.SetStateAction<trainStageType>>;
}

const ReviewSentence: React.FC<IReviewSentenceExerciseProps> = ({sense, sentence, setStage, setCurrentSenseIndex}) => {
    const [review, setReview] = useState<IReview | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    useEffect(() => {
        async function getReview(atempts: number = 3) {
            if (atempts < 0) {
                setIsError(true)
                return
            }

            setIsLoading(true)
            try {
                const fetchedReview = await TrainService.getAIReview(sentence, sense)
                setReview(fetchedReview)
            } catch (e) {
                await getReview(atempts - 1)
                console.log("Во время получения Ai ревью возникла ошибка")
            }
            setIsLoading(false)
        }

        getReview()
    }, [sense]);

    let scoreProgressColor: OverridableStringUnion<ColorPaletteProp, LinearProgressPropsColorOverrides>;
    if (review?.score < 5) {
        scoreProgressColor = "danger"
    } else if (review?.score < 7) {
        scoreProgressColor = "warning"
    } else {
        scoreProgressColor = "primary"
    }

    function handleNext() {
        setStage("default")
        setCurrentSenseIndex(prev => prev + 1)
    }

    function handleAgain() {
        setStage("buildSentence")
    }

    const component = <div className={classes.component}>
        <Card size={"lg"} variant={"soft"} sx={{borderRadius: 20, padding: 3, width: 700}}>
            <Typography level="h2">{sentence}</Typography>
            <Divider inset="none"/>
            <CardContent>
                {review?.corrected_sentence != "N/A" &&
                    <>
                        < Typography level="title-lg" fontSize={"xl"}>Correct sentence:</Typography>
                        <Typography level="body-lg" fontSize={"xl"}>
                            {review?.corrected_sentence}
                        </Typography>
                    </>
                }
                <Typography level="title-lg" fontSize={"xl"}>Feedback:</Typography>
                <Typography level="body-sm" fontSize={"xl"}>
                    {review?.feedback}
                </Typography>
                <Typography level="title-lg" fontSize={"xl"}>Explanation:</Typography>
                <Typography level="body-sm" fontSize={"xl"}>
                    {review?.explanation}
                </Typography>
                <Typography level="title-lg" fontSize={"xl"}>Score: {review?.score}/10</Typography>
                <LinearProgress determinate color={scoreProgressColor} variant={"outlined"} value={review?.score * 10}/>
            </CardContent>
            <CardActions orientation={"horizontal-reverse"}>
                <Button color={"primary"} onClick={handleNext}>Next</Button>
                <Button color={"neutral"} onClick={handleAgain}>Try again</Button>
            </CardActions>
        </Card>
    </div>

    return (
        isError ? "Something go wrong..." :
            isLoading ? <LoaderForPage/> : component
    );
};

export default ReviewSentence;