import React, {useState} from 'react';
import classes from "./WordCard.module.css"
import OneSizeBlock from "../OneSizeBlock/OneSizeBlock";
import "../../../../fontStyles.css"


const WordCard = ({user_word}) => {
    return (
        <OneSizeBlock>
            <div className={classes.Text}>
                <div className={classes.Title}>
                    <span className="titleFont">{user_word.content}</span>
                </div>
                <div className="unimportantFont" style={{textAlign: "center"}}>
                    {user_word.meaning}
                </div>
                <div className={"classes.progress"}></div>
            </div>
        </OneSizeBlock>
    );
};

export default WordCard;