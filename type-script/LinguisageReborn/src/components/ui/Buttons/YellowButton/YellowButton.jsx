import React from 'react';
import classes from "./Yellow.module.css";


const YellowButton = ({children}) => {
    return (
        <button className={classes.Button}>{children}</button>
    );
};

export default YellowButton;