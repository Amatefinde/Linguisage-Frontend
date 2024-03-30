import React, {useEffect, useState} from "react";
import {IUserSense} from "../../../types/UserSensesInterface.ts";
import TrainService from "../../../http/services/TrainService.ts";
import TrainWordCard from "../../blocks/TrainWordCard/TrainWordCard.tsx";
import RoundedInput from "../../ui/RoundedInput/RoundedInput.tsx";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import LinearProgress from "@mui/joy/LinearProgress";
import {keyframes} from "@emotion/react";
import Header from "../../blocks/Header/Header.tsx";
import LoaderForPage from "../../ui/LoaderForPage/LoaderForPage.tsx";
import classes from "./TrainPage.module.css"


const TrainPage = () => {
    const [trainSenses, setTrainSenses] = useState<IUserSense[] | []>([]);
    const [isLoading, setIsLooding] = useState<boolean>(true);
    const [userInput, setUserInput] = useState<string>("");
    const [currentSenseIndex, setCurrentSenseIndex] = useState<number>(0);
    const [isCorrect, setIsCorrect] = useState<boolean>(true);

    const width = 650;

    const queryParams = new URLSearchParams(location.search);
    const totalAmountOfWordsParam = queryParams.get("totalAmountOfWords");
    const percentOfStudiedWordsParam = queryParams.get("percentOfStudiedWords");
    const buildSentencesParam = queryParams.get("buildSentences");

    const totalAmountOfWords =
        totalAmountOfWordsParam !== null
            ? parseInt(totalAmountOfWordsParam)
            : 5;
    const percentOfStudiedWords =
        percentOfStudiedWordsParam !== null
            ? parseInt(percentOfStudiedWordsParam)
            : 0;
    const buildSentences = buildSentencesParam !== null ? Boolean(buildSentencesParam) : false;

    useEffect(() => {
        async function fetchTrain() {
            setIsLooding(true);
            try {
                const fetchedCardSenses = await TrainService.getTrain(
                    totalAmountOfWords,
                    percentOfStudiedWords
                );
                setTrainSenses(fetchedCardSenses.senses);
                console.log(fetchedCardSenses);
            } catch (e) {
                console.log(e);
            }
            setIsLooding(false);
        }

        fetchTrain();
    }, []);

    const handleCheck = () => {
        const currentSense = trainSenses[currentSenseIndex];
        const currentWord = currentSense.word.word;
        if (userInput.toLowerCase() === currentWord.toLowerCase()) {
            setIsCorrect(true);
            setCurrentSenseIndex(prev => prev + 1)
            setUserInput("")
        } else {
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

    const trainComponent = (
        <div className={classes.component}>
            <TrainWordCard sense={trainSenses[currentSenseIndex]}/>
            <Sheet
                sx={{
                    display: "flex",
                    background: "white",
                    gap: 4,
                    margin: 3,
                    justifyContent: "center",
                }}
                variant="plain"
            >
                <RoundedInput
                    inputStyles={{
                        width: width,
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
                    value={Math.floor(currentSenseIndex / trainSenses.length * 100)}
                />
            </div>
        </div>
    );

    return (
        <>
            <Header/>
            {isLoading ? <LoaderForPage/> : trainComponent}
        </>
    );
};

export default TrainPage;