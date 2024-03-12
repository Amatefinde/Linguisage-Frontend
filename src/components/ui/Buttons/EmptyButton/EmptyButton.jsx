import React from "react";
import classes from "./EmptyButton.module.css";

const EmptyButton = ({ children, style, ...props }) => {
  return (
    <button {...props} className={classes.Button}>
      {children}
    </button>
  );
};

export default EmptyButton;
