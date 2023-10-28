import React from 'react';
import classes from "./AccentButton.module.css";


const AccentButton = ({children, callback, }) => {
    return (
        <button onClick={callback} className={classes.Button}>{children}</button>
    );
};

export default AccentButton;