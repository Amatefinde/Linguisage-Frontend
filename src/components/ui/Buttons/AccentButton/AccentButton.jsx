import React from 'react';
import classes from "./AccentButton.module.css";


const AccentButton = ({children}) => {
    return (
        <button type={"submit"} className={classes.Button}>{children}</button>
    );
};

export default AccentButton;