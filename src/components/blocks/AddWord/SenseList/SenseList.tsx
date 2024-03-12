import classes from "./SenseList.module.css"
import {IWordData} from "../../../../types/WordInterface";
import React from "react";
import Sense from "./Sense/Sense.tsx";
import {AddErrorType} from "../AddErrorEnum.ts";


interface SensesInterface {
    wordData: IWordData;
    pickedFSenseId: number | null;
    setPickedFSenseId: (value: number) => void;
    setAddError: (value: AddErrorType) => void;
}

const SenseList: React.FC<SensesInterface> = ({wordData, pickedFSenseId, setPickedFSenseId, setAddError}) => {
    return (
        <div className={classes.senseList}>
            {wordData.senses.map(sense => <div className={classes.senseWrapper} key={sense.f_sense_id}>
                <Sense
                    setAddError={setAddError}
                    sense={sense}
                    pickedFSenseId={pickedFSenseId}
                    setPickedFSenseId={setPickedFSenseId}
                />
            </div>)}
        </div>
    );
};

export default SenseList;