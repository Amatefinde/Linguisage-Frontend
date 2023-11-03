import React, {useState} from 'react';
import classes from "./Ckeckbox.module.css";
import {cleanup} from "@testing-library/react";


const Checkbox = ({name, isChecked, register, setIsChecked}) => {


    return (
        <label className={classes.wrapper}>
            <div className={isChecked ? classes.active : ""}></div>
            <input
                className={classes.my_checkbox}
                type="checkbox"
                {...register}

            >
            </input>

            <div className={classes.text}>{name}</div>
        </label>
    );
};

export default Checkbox;