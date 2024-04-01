import React from 'react';
import classes from "../../WriteWordExercise/WriteWordExercise.module.css";
import Typography from "@mui/joy/Typography";
import SenseCard from "../../../../DictionaryPage/SenseCard/SenseCard.tsx";
import Sheet from "@mui/joy/Sheet";
import RoundedInput from "../../../../../ui/RoundedInput/RoundedInput.tsx";
import Button from "@mui/joy/Button";
import LinearProgress from "@mui/joy/LinearProgress";
import {IUserSense} from "../../../../../../types/UserSensesInterface.ts";
import {trainStageType} from "../../../TrainPage.tsx";


interface IBuildSentenceProps {
    userInput: value;
    setUserInput: React.Dispatch<React.SetStateAction<string>>;
    sense: IUserSense;
    setStage: React.Dispatch<React.SetStateAction<trainStageType>>;
}

const BuildSentence: React.FC<IBuildSentenceProps> = ({setStage, userInput, setUserInput, sense}) => {

    function handleCheck() {
        setStage("reviewSentence")
    }

    return (
        <div className={classes.component}>
            <Typography level={"title-lg"} fontSize={"xl2"}>Now make a sentence with this word</Typography>
            <SenseCard sense={sense} forTraining/>
            <Sheet
                sx={{
                    display: "flex",
                    background: "white",
                    gap: 4,
                    justifyContent: "center",
                }}
                variant="plain"
            >
                <RoundedInput
                    placeholder={"Enter your sentence"}
                    inputStyles={{
                        width: 1094,
                        padding: "5px 15px",
                    }}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onSubmit={handleCheck} // Добавляем обработчик нажатия клавиши
                />
                <Button sx={{borderRadius: 20}} variant={"soft"}
                        onClick={handleCheck}
                >
                    Check
                </Button>
            </Sheet>

        </div>
    );
};

export default BuildSentence;