import React, {useEffect, useState} from "react";
import {IUserSense} from "../../../types/UserSensesInterface.ts";
import TrainService from "../../../http/services/TrainService.ts";
import Header from "../../blocks/Header/Header.tsx";
import LoaderForPage from "../../ui/LoaderForPage/LoaderForPage.tsx";
import classes from "./TrainPage.module.css"
import TrainingComplete from "./TrainingComplete/TrainingComplete.tsx";
import EmptyDictionary from "./EmptyDictionary/EmptyDictionary.tsx";
import WriteWordExercise from "./Exercises/WriteWordExercise/WriteWordExercise";
import BuildSentenceExercise from "./Exercises/BuildSentenceExercise/BuildSentenceExercise.tsx";

export type trainStageType = "default" | "buildSentence" | "reviewSentence"

const TrainPage = () => {
    const [trainSenses, setTrainSenses] = useState<IUserSense[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [currentSenseIndex, setCurrentSenseIndex] = useState<number>(0);

    const queryParams = new URLSearchParams(location.search);
    const totalAmountOfWordsParam = queryParams.get("totalAmountOfWords");
    const percentOfStudiedWordsParam = queryParams.get("percentOfStudiedWords");
    const buildSentences = queryParams.get("buildSentences") === "true";
    const totalAmountOfWords = totalAmountOfWordsParam !== null ? parseInt(totalAmountOfWordsParam) : 5;
    const percentOfStudiedWords = percentOfStudiedWordsParam !== null ? parseInt(percentOfStudiedWordsParam) : 0;

    const [stage, setStage] = useState<trainStageType>("default")

    const currentSense = trainSenses[currentSenseIndex];
    const progressBarBaseValue = Math.floor(currentSenseIndex / trainSenses.length * 100)
    const progressBarBuildSentenceValue = Math.floor((currentSenseIndex + 0.5) / trainSenses.length * 100)

    useEffect(() => {
        async function fetchTrain() {
            setIsLoading(true);
            try {
                const fetchedCardSenses = await TrainService.getTrain(
                    totalAmountOfWords,
                    percentOfStudiedWords
                );
                setTrainSenses(fetchedCardSenses.senses);
            } catch (e) {
                console.log(e);
            }
            setIsLoading(false);
        }

        fetchTrain();
    }, []);


    let renderedComponent;
    if (isLoading) {
        renderedComponent = <LoaderForPage/>;
    } else if (!trainSenses.length) {
        renderedComponent = <EmptyDictionary/>
    } else if (trainSenses.length === currentSenseIndex && !!trainSenses.length) {
        renderedComponent = <TrainingComplete/>
    } else if (stage === "default") {
        renderedComponent = <WriteWordExercise
            sense={currentSense}
            setCurrentSenseIndex={setCurrentSenseIndex}
            progressBarValue={progressBarBaseValue}
            setStage={buildSentences && setStage}
        />
    } else if (buildSentences) {
        renderedComponent = <BuildSentenceExercise
                setStage={setStage}
                stage={stage}
                setCurrentSenseIndex={setCurrentSenseIndex}
                sense={currentSense}
                progressBarValue={progressBarBuildSentenceValue}
            />
    }

    return (
        <>
            <Header/>
            {renderedComponent}
        </>
    );
};

export default TrainPage;