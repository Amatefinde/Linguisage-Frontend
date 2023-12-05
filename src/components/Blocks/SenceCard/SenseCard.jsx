import React from 'react';
import classes from "./SenseCard.module.css";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";

const SenseCard = ({sense}) => {
    return (
        <div className={classes.senseCard}>
            <div className={classes.senseBody}>
                <div className={classes.senseWord}>
                    {sense.word}
                    <div className={classes.senseDefinition}>
                        {sense.definition}
                    </div>
                </div>
                <img src={sense.img} className={classes.senseImage} alt={sense.img.alt}/>
            </div>
            <ProgressBar value={sense.progress.value} total={sense.progress.total}/>
        </div>
    );
};

export default SenseCard;