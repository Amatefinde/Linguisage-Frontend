import React, {useState} from 'react';
import classes from "./Ckeckbox.module.css";
import {cleanup} from "@testing-library/react";


const Checkbox = ({name, isChecked, register, setIsChecked}) => {


    return (
        <label className={classes.wrapper}>
            {/*<div className={classes.checkbox}></div>*/}
            <div className={isChecked ? classes.active : ""}></div>
            <input

                type="checkbox"
                {...register}

            >
            </input>

            <div className={classes.text}>{name}</div>
        </label>
    );
};

export default Checkbox;