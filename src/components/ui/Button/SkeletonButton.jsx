import React from 'react';
import classes from "./SkeletonButton.module.css";


const SkeletonButton = ({children}) => {
    return (
        <button className={classes.Button}>{children}</button>
    );
};

export default SkeletonButton;