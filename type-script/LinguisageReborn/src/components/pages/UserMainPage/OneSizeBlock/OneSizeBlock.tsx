import classes from "./OneSizeBlock.module.css"
import React from "react";

interface OneSizeBlockInterface {
    children: React.ReactNode;
}

const OneSizeBlock: React.FC<OneSizeBlockInterface> = ({children}) => {
    return (
        <div className={classes.OneSizeBlock}>
            {children}
        </div>
    );
};

export default OneSizeBlock;