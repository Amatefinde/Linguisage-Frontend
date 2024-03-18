import React from 'react';
import {IUserSense} from "../../../../types/UserSensesInterface.ts";
import SenseCard from "../SenseCard/SenseCard.tsx";
import classes from "./SenseCardList.module.css"

interface SenseCardListInterface {
    senses: IUserSense[];
}

const SenseCardList: React.FC<SenseCardListInterface> = ({senses}) => {
    return (
        senses && senses.map(sense => <div className={classes.senseWrapper} key={sense.id}><SenseCard sense={sense}/></div>)
    );
};

export default SenseCardList;