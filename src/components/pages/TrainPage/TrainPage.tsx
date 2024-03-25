import React, { useEffect, useState } from "react";
import { IUserSense } from "../../../types/UserSensesInterface.ts";
import TrainService from "../../../http/services/TrainService.ts";
import TrainWordCard from "../../blocks/TrainWordCard/TrainWordCard.tsx";
import RoundedInput from "../../ui/RoundedInput/RoundedInput.tsx";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import LinearProgress from "@mui/joy/LinearProgress";
import { keyframes } from "@emotion/react";
import Header from "../../blocks/Header/Header.tsx";

const TrainPage = () => {
    const [trainSenses, setTrainSenses] = useState<IUserSense[] | []>([]);
    const [isLoading, setIsLooding] = useState<boolean>(true);
    const [userInput, setUserInput] = useState<string>("");
    const [currentSenseIndex, setCurrentSenseIndex] = useState<number>(0);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [showProgress, setShowProgress] = useState<boolean>(false);

    const width = 650

    useEffect(() => {
        async function fetchTrain() {
            setIsLooding(true);
            try {
                const fetchedCardSenses = await TrainService.getTrain(20);
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
            setShowProgress(true);
            setTimeout(() => {
                setUserInput("");
                setCurrentSenseIndex((prevIndex) => prevIndex + 1);
                setIsCorrect(false);
                setShowProgress(false);
            }, 1000);
        } else {
            setIsCorrect(false);
            setShowProgress(true);
            setTimeout(() => {
                setShowProgress(false);
            }, 1000);
        }
    };

    const shakeAnimation = keyframes`
        0% { transform: translateY(0); }
        25% { transform: translateY(-10px); }
        50% { transform: translateY(10px); }
        75% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    `;

    const trainComponent = (
        <div>
            <TrainWordCard sense={trainSenses[currentSenseIndex]} />
            <Sheet
                sx={{
                    display: "flex",
                    background: "white",
                    gap: 4,
                    padding: 3.5,
                    justifyContent: "center",
                }}
                variant="plain"
            >
                <RoundedInput
                    inputStyles={{
                        width: width,
                        padding: "5px 15px",
                        border: isCorrect ? "2px solid green" : undefined,
                    }}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <Button sx={{ borderRadius: 20 }} onClick={handleCheck}>
                    Check
                </Button>
            </Sheet>
        </div>
    );

    return (
        <>
        <Header/>
        <div
            style={{
                width: "100dvw",
                height:  "90vdh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "50px",
                flexDirection: "column",
                position: "relative",
            }}
        >
            {showProgress && (
                <div style={{
                    position: "absolute",
                    bottom: "20%",
                    transform: "translateX(-50%)",
                }}>
                <LinearProgress
                    color={isCorrect ? "success" : "danger"}
                    variant={"solid"}
                    sx={{
                        width: 750,
                        height: "20px",
                        left: "50%",
                        animation: !isCorrect ? `${shakeAnimation} 0.5s ease` : "none",
                    }}
                    determinate={false}
                />
                </div>
            )}
            {isLoading ? "Loading" : trainComponent}
        </div>
        </>
    );
};

export default TrainPage;