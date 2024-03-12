import React from 'react';
import {IUserSenses} from "../../../../types/UserSensesInterface.ts";
import SenseCard from "../SenseCard/SenseCard.tsx";
import classes from "./SenseCardList.module.css"

interface SenseCardListInterface {
    senses: IUserSenses | null;
}

const SenseCardList: React.FC<SenseCardListInterface> = ({senses}) => {
    return (
        senses && senses.senses.map(sense => <div className={classes.senseWrapper}><SenseCard key={sense.id} sense={sense}/></div>)
    );
};

export default SenseCardList;