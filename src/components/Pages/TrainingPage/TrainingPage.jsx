import React, { useState } from "react";
import classes from "./TrainingPage.module.css";
import Header from "../../Blocks/Header/Header";
import DefineWordExercise from "./Exercises/DefineWordExercise/DefineWordExercise";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import next_icon from "../../icons/next_arrow.svg";
import AnswerInput from "./Exercises/DefineWordExercise/AnswerInput/AnswerInput";

const TrainingPage = () => {
  const [userAnswer, setUserAnswer] = useState();

  return (
    <>
      <Header />
      <div className={classes.trainContent}>
        <DefineWordExercise />
        <AnswerInput userAnswer={userAnswer} setUserAnswer={setUserAnswer} />
        <div className={classes.progressWrapper}>
          <ProgressBar
            style={{ flexDirection: "row-reverse" }}
            value={3}
            total={10}
          />
          <img src={next_icon} className={classes.nextButton} />
        </div>
      </div>
    </>
  );
};

export default TrainingPage;
