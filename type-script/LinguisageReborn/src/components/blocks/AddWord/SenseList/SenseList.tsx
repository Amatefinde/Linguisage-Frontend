import classes from "./SenseList.module.css"
import {IWordData} from "../../../../types/WordInterface";
import React from "react";
import Sense from "./Sense/Sense.tsx";


interface SensesInterface {
    wordData: IWordData;
    pickedFSenseId: number;
    setPickedFSenseId: (value: number) => void;
}
const SenseList: React.FC<SensesInterface> = ({wordData, pickedFSenseId, setPickedFSenseId}) => {
    return (
        <div className={classes.senseList}>
            {wordData.senses.map(sense => <div className={classes.senseWrapper}><Sense
                sense={sense}
                key={sense.f_sense_id}
                pickedFSenseId={pickedFSenseId}
                setPickedFSenseId={setPickedFSenseId}
            /></div>)}
        </div>
    );
};

export default SenseList;