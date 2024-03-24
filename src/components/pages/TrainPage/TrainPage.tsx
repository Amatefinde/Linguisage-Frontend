import React, {useEffect, useState} from "react";
import {IUserSense} from "../../../types/UserSensesInterface.ts";
import TrainService from "../../../http/services/TrainService.ts";
import TrainWordCard from "../../blocks/TrainWordCard/TrainWordCard.tsx";
import RoundedInput from "../../ui/RoundedInput/RoundedInput.tsx";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";

const TrainPage = () => {

    const [trainSenses, setTrainSenses] = useState<IUserSense[] | []>([])
    const [isLaoding, setIsLaoding] = useState<boolean>(true)
    const [userInput, setUserInput] = useState<string>("")
    useEffect(() => {
        async function fetchTrain() {
            setIsLaoding(true)
            try {
                const fetchedCardSenses = await TrainService.getTrain(20)
                setTrainSenses(fetchedCardSenses.senses)
                console.log(fetchedCardSenses)
            } catch (e) {
                console.log(e)
            }
            setIsLaoding(false)
        }
        fetchTrain()
    }, []);

    const trainComponent =
        <div>
            <TrainWordCard sense={trainSenses[0]}/>
            <Sheet sx={{display: "flex", background: "white", gap: 4, padding: 3.5}} variant={"plain"}>
            <RoundedInput inputStyles={{width: 650, padding: "5px 15px"}} value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
                <Button sx={{borderRadius: 20}}>Check</Button>
            </Sheet>
        </div>

    return (
        <div style={{
            width: "100dvw",
            height: "100dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
            flexDirection: "column",
        }}>
            {isLaoding ? "Loading" : trainComponent}
        </div>
    );
};

export default TrainPage;