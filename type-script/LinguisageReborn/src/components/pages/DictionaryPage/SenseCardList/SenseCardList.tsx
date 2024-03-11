import React from 'react';
import {IUserSenses} from "../../../../types/UserSensesInterface.ts";
import SenseCard from "../SenseCard/SenseCard.tsx";

interface SenseCardListInterface {
    senses: IUserSenses | null;
}

const SenseCardList: React.FC<SenseCardListInterface> = ({senses}) => {
    return (
        senses && senses.senses.map(sense => <SenseCard key={sense.id} sense={sense}/>)
    );
};

export default SenseCardList;