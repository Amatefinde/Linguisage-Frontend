import React from "react";
import classes from "./ProgressBar.module.css";

const ProgressBar = ({ value, total, style, percent }) => {
  const percentage = percent !== undefined ? percent : (value / total) * 100;

  const ratioElement = (
    <span className={classes.titleProgress}>{`${value}/${total}`}</span>
  );
  const percentElement = (
    <span className={classes.titleProgress}>{`${percent}%`}</span>
  );
  return (
    <div className={classes.progressBar} style={style}>
      <div className={classes.progressBackground}>
        <div
          className={classes.progressLine}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {percent !== undefined ? percentElement : ratioElement}
    </div>
  );
};

export default ProgressBar;
