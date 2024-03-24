import React, { useEffect, useState } from "react";
import { IUserSense } from "../../../types/UserSensesInterface.ts";
import TrainService from "../../../http/services/TrainService.ts";
import TrainWordCard from "../../blocks/TrainWordCard/TrainWordCard.tsx";
import RoundedInput from "../../ui/RoundedInput/RoundedInput.tsx";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";

const TrainPage = () => {
    const [trainSenses, setTrainSenses] = useState<IUserSense[] | []>([]);
    const [isLoading, setIsLooding] = useState<boolean>(true);
    const [userInput, setUserInput] = useState<string>("");
    const [currentSenseIndex, setCurrentSenseIndex] = useState<number>(0);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);

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
            setTimeout(() => {
                setUserInput("");
                setCurrentSenseIndex((prevIndex) => prevIndex + 1);
                setIsCorrect(false);
            }, 1000);
        } else {
            setIsCorrect(false);
        }
    };

    const trainComponent = (
        <div>
            <TrainWordCard sense={trainSenses[currentSenseIndex]} />
            <Sheet
                sx={{
                    display: "flex",
                    background: "white",
                    gap: 4,
                    padding: 3.5,
                }}
                variant="plain"
            >
                <RoundedInput
                    inputStyles={{
                        width: 650,
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
        <div
            style={{
                width: "100dvw",
                height: "100dvh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "50px",
                flexDirection: "column",
            }}
        >
            {isLoading ? "Loading" : trainComponent}
        </div>
    );
};

export default TrainPage;

