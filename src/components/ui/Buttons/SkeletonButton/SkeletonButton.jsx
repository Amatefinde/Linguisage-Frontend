import React from "react";
import classes from "./SkeletonButton.module.css";

const SkeletonButton = ({ children, style }) => {
  return (
    <button style={style} className={classes.Button}>
      {children}
    </button>
  );
};

export default SkeletonButton;
