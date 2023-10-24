import React, {useState} from 'react';
import classes from "./WordCard.css"
import OneSizeBlock from "../OneSizeBlock/OneSizeBlock";



const WordCard = ({user_word}) => {
    return (
        <OneSizeBlock>
            <div className={classes.Text}>
                <div className={classes.Title}>
                    {user_word.content}
                </div>
                <div className={classes.SubTitle}>
                    {user_word.short_meaning}
                </div>
            </div>
        </OneSizeBlock>
    );
};

export default WordCard;