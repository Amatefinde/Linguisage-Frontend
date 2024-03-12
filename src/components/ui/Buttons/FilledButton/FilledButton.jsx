import React from "react";
import classes from "./FilledButton.module.css";

const FilledButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.Button}>
      {children}
    </button>
  );
};

export default FilledButton;
