import React, {useState} from 'react';
import classes from "./MotivationBlock.module.css"
import BaitStars from "./static/BaitStars.png"



const MotivationBlock = ({}) => {
    return (
        <div className={classes.island}>
            <div className={classes.baitStars}>
                <img src={BaitStars}/>
            </div>
        </div>
    );
};

export default MotivationBlock;