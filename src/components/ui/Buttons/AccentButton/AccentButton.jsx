import React from "react";
import classes from "./AccentButton.module.css";

const AccentButton = (props) => {
  const { children, width } = props;
  return (
    <button {...props} type={"submit"} className={classes.Button}>
      {children}
    </button>
  );
};

export default AccentButton;
