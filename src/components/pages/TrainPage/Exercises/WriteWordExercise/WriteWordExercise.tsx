import React, {useState} from 'react';
import {IUserSense} from "../../../../../types/UserSensesInterface.ts";

import TrainWordCard from "../../../../blocks/TrainWordCard/TrainWordCard.tsx";
import Sheet from "@mui/joy/Sheet";
import RoundedInput from "../../../../ui/RoundedInput/RoundedInput.tsx";
import Button from "@mui/joy/Button";
import LinearProgress from "@mui/joy/LinearProgress";
import classes from "./WriteWordExercise.module.css"
import TrainService from "../../../../../http/services/TrainService.ts";
import {keyframes} from "@emotion/react";
import {trainStageType} from "../../TrainPage.tsx";


interface IBuildSentenceExerciseProps {
    sense: IUserSense;
    setCurrentSenseIndex: React.Dispatch<React.SetStateAction<number>>;
    progressBarValue: value;
    setStage: false | React.Dispatch<React.SetStateAction<trainStageType>>;
}

const WriteWordExercise: React.FC<IBuildSentenceExerciseProps> = ({sense, setStage, setCurrentSenseIndex, progressBarValue}) => {
        const [userInput, setUserInput] = useState<string>("");
        const [isCorrect, setIsCorrect] = useState<boolean>(true);
        const handleCheck = () => {

            const currentWord = sense.word.word;

            if (userInput.toLowerCase() === currentWord.toLowerCase()) {
                TrainService.addAnswer(sense.id, true).then(e => e)
                if (setStage) {
                    setStage("buildSentence")
                } else {
                    setCurrentSenseIndex(prev => prev + 1)
                    setUserInput("")
                }
            } else {
                TrainService.addAnswer(sense.id, false).then(e => e)
                setIsCorrect(false);
                setTimeout(() => {
                    setIsCorrect(true);
                }, 500)
            }
        };


    const shakeAnimation = keyframes`
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-10px);
        }
        50% {
            transform: translateX(10px);
        }
        75% {
            transform: translateX(-10px);
        }
        100% {
            transform: translateX(0);
        }
    `;

        return (
            <div className={classes.component}>
                <TrainWordCard sense={sense}/>
                <Sheet
                    sx={{
                        display: "flex",
                        background: "white",
                        gap: 4,
                        margin: 5,
                        justifyContent: "center",
                    }}
                    variant="plain"
                >
                    <RoundedInput
                        inputStyles={{
                            width: 650,
                            padding: "5px 15px",
                        }}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onSubmit={handleCheck} // Добавляем обработчик нажатия клавиши
                    />
                    <Button sx={{borderRadius: 20}} variant={"soft"} onClick={handleCheck}>
                        Check
                    </Button>
                </Sheet>
                <div className={classes.progressWrapper}>
                    <LinearProgress
                        color={isCorrect ? "primary" : "danger"}
                        variant={"solid"}
                        sx={{
                            width: 750,
                            height: "20px",
                            animation: !isCorrect
                                ? `${shakeAnimation} 0.5s ease`
                                : "none",
                        }}
                        determinate
                        value={progressBarValue}
                    />
                </div>
            </div>
        );
    }
;

export default WriteWordExercise;