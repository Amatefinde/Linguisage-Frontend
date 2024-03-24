import React from 'react';
import classes from "./Yellow.module.css";


const YellowButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.Button}>{children}</button>
    );
};

export default YellowButton;