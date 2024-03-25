import React, {useEffect, useState} from 'react';
import AddWordBlock from "./AddWordBlock/AddWordBlock.tsx";
import TrainService from "../../../../http/services/TrainService.ts";
import {IUserSense} from "../../../../types/UserSensesInterface.ts";
import WordCard from "./WordCard/WordCard.tsx";


interface IWordCardProps {
    setIsWordCardsLoading: (value: boolean) => void;
}

const WordCards: React.FC<IWordCardProps> = ({setIsWordCardsLoading}) => {
    const [cardSenses, setCardSenses] = useState<IUserSense[] | []>([])
    const [rerenderWordBlock, setRerenderWordBlock] = useState<boolean>(false)

    useEffect(() => {
        async function fetchTrain() {
            try {
                setIsWordCardsLoading(true)
                const fetchedCardSenses = await TrainService.getTrain(3)
                setCardSenses(fetchedCardSenses.senses)
                console.log(fetchedCardSenses)
            } catch (e) {
                console.log(e)

            }
            setIsWordCardsLoading(false)
        }
        fetchTrain()
    }, []);

    useEffect(() => {
        async function silentFetchTrain() {
            try {
                const fetchedCardSenses = await TrainService.getTrain(3)
                setCardSenses(fetchedCardSenses.senses)
                console.log(fetchedCardSenses)
            } catch (e) {
                console.log(e)
            }
        }
        silentFetchTrain()
    }, [rerenderWordBlock]);

    const cards = [<AddWordBlock setRerenderWordBlock={setRerenderWordBlock}/>, ...cardSenses.map(sense => <WordCard sense={sense}/>)]
    while (cards.length < 4) {
        cards.unshift(<AddWordBlock setRerenderWordBlock={setRerenderWordBlock}/>)
    }
    return (
        <>
            {cards}
        </>
    );
};

export default WordCards;