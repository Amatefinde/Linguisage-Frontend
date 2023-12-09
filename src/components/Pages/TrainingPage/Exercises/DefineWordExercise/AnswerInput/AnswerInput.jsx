import React from "react";
import classes from "./AnswerInput.module.css";

const AnswerInput = ({ userAnswer, setUserAnswer }) => {
  return (
    <div>
      <input
        className={classes.input}
        value={userAnswer ? userAnswer : ""}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
    </div>
  );
};

export default AnswerInput;
