import React from 'react';
import classes from "./InputBlock.module.css";
import * as events from "events";
import InputField from "../InputField/InputField";

const InputBlock = ({name, register, text, setText, placeholder="", type}) => {


    return (

        <div className={classes.parent}>
            <label>
            <div className={classes.name}>{name}</div>
            <InputField
                register={register}
                text={text}
                setText={setText}
                placeholder={placeholder}
                type={type}
            />
            </label>

        </div>
    );
};

export default InputBlock;