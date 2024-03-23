import React, {useEffect, useState} from "react";
import {IUserSense} from "../../../types/UserSensesInterface.ts";
import TrainService from "../../../http/services/TrainService.ts";
import VerticalTrainWordCard from "../../blocks/TrainWordCard/VerticalTrainWordCard/VerticalTrainWordCard.tsx";

const TrainPage = () => {

    const [trainSenses, setTrainSenses] = useState<IUserSense[] | []>([])

    useEffect(() => {
        async function fetchTrain() {
            try {
                const fetchedCardSenses = await TrainService.getTrain(3)
                setTrainSenses(fetchedCardSenses.senses)
                console.log(fetchedCardSenses)
            } catch (e) {
                console.log(e)
            }
        }
        fetchTrain()
    }, []);
    return (
        <div style={{
            width: "100dvw",
            height: "100dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}><VerticalTrainWordCard sense={trainSenses[0]}/></div>
    );
};

export default TrainPage;