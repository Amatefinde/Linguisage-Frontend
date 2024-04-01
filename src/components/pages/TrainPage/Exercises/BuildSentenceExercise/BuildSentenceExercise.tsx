import React, {useState} from 'react';
import {IUserSense} from "../../../../../types/UserSensesInterface.ts";
import classes from "../WriteWordExercise/WriteWordExercise.module.css";
import LinearProgress from "@mui/joy/LinearProgress";

import BuildSentence from "./BuildSentence/BuildSentence.tsx";
import {trainStageType} from "../../TrainPage.tsx";
import ReviewSentence from "./ReviewSentence/ReviewSentence.tsx";

interface IBuildSentenceExerciseProps {
    sense: IUserSense;
    stage: trainStageType;
    progressBarValue: number;
    setCurrentSenseIndex: React.Dispatch<React.SetStateAction<number>>;
    setStage: React.Dispatch<React.SetStateAction<trainStageType>>;

}

const BuildSentenceExercise: React.FC<IBuildSentenceExerciseProps> = ({
    sense,
    progressBarValue,
    stage,
    setCurrentSenseIndex,
    setStage
}) => {
    const [userInput, setUserInput] = useState<string>("");

    let component;
    if (stage === "buildSentence") {
        component = <BuildSentence
            setStage={setStage}
            sense={sense}
            setUserInput={setUserInput}
            userInput={userInput}
        />
    } else if (stage === "reviewSentence") {
        component = <ReviewSentence
            sense={sense}
            sentence={userInput}
            setCurrentSenseIndex={setCurrentSenseIndex}
            setStage={setStage}
        />
    } else {
        component = <div>Something go wrong</div>
    }

    return (
        <div className={classes.container}>
            {component}
            <div className={classes.progressWrapper}>
                <LinearProgress
                    color={"primary"}
                    variant={"solid"}
                    sx={{
                        width: 750,
                        height: "20px",
                    }}
                    determinate
                    value={progressBarValue}
                />
            </div>
        </div>);
};

export default BuildSentenceExercise;