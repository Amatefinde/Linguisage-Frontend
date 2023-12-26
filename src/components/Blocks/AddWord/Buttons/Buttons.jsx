import React from 'react';
import classes from "./Buttons.module.css";
import EmptyButton from "../../../ui/Buttons/EmptyButton/EmptyButton";
import FilledButton from "../../../ui/Buttons/FilledButton/FilledButton";

const Buttons = ({addHandler, setModalActive, isAlreadyInDictionary}) => {
    console.log(isAlreadyInDictionary)
    return (<div className={classes.wrapper}>
            <span className={classes.warning}>
                {isAlreadyInDictionary ? "This sense already in your dictionary" : " "}
            </span>
        <div className={classes.buttonsWrapper}>
            <EmptyButton onClick={() => setModalActive(false)}>
                Cancel
            </EmptyButton>
            {isAlreadyInDictionary ?
                <FilledButton onClick={addHandler} disabled={true} style={{
                    background: "none",
                    border: "solid 3px #bebebe",
                    color: "#bebebe"
                }}>Add</FilledButton> :
                <FilledButton onClick={addHandler}>Add</FilledButton>
            }

        </div>
    </div>);
};

export default Buttons;