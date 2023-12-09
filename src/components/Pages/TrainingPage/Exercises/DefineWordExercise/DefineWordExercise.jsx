import classes from "./DefineWordExercise.module.css";

import React, { useState } from "react";
import DefineWordWithHorizontalPicture from "./Horizontal/DefineWordWithHorizontalPicture";
import AnswerInput from "./AnswerInput/AnswerInput";
import ProgressBar from "../../../../ui/ProgressBar/ProgressBar";

const DefineWordExercise = () => {
  return (
    <div className={classes.wrapper}>
      <DefineWordWithHorizontalPicture />
    </div>
  );
};

export default DefineWordExercise;
