import classes from "./DefineWordExercise.module.css";

import React, { useState } from "react";
import DefineWordWithHorizontalPicture from "./Horizontal/DefineWordWithHorizontalPicture";
import AnswerInput from "./AnswerInput/AnswerInput";
import ProgressBar from "../../../../ui/ProgressBar/ProgressBar";

const DefineWordExercise = ({ exerciseContent }) => {
  return (
    <div className={classes.wrapper}>
      <DefineWordWithHorizontalPicture exerciseContent={exerciseContent} />
    </div>
  );
};

export default DefineWordExercise;
