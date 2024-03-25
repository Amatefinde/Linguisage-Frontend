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

    const cards = [<AddWordBlock/>, ...cardSenses.map(sense => <WordCard sense={sense}/>)]
    while (cards.length < 4) {
        cards.unshift(<AddWordBlock/>)
    }
    return (
        <>
            {cards}
        </>
    );
};

export default WordCards;