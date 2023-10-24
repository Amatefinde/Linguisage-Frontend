import React, {useState} from 'react';
import classes from "./OneSizeBlock.module.css"



const OneSizeBlock = ({children}) => {
    return (
        <div className={classes.OneSizeBlock}>
            {children}
        </div>
    );
};

export default OneSizeBlock;