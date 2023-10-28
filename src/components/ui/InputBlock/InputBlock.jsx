import React from 'react';
import classes from "./InputBlock.module.css";
import * as events from "events";
import InputField from "../InputField/InputField";

const InputBlock = ({name, text, setText, placeholder="", type}) => {


    return (

        <div className={classes.parent}>
            <div className={classes.name}>{name}</div>
            <InputField
                text={text}
                setText={setText}
                placeholder={placeholder}
                type={type}
            />

        </div>
    );
};

export default InputBlock;