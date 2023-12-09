import React, { useEffect, useState } from "react";
import classes from "./TrainingPage.module.css";
import Header from "../../Blocks/Header/Header";
import DefineWordExercise from "./Exercises/DefineWordExercise/DefineWordExercise";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import next_icon from "../../icons/next_arrow.svg";
import AnswerInput from "./Exercises/DefineWordExercise/AnswerInput/AnswerInput";
import TrainService from "../../../services/TrainService";
import Loading from "../Loading/Loading";
import WordFullCard from "../../Blocks/WordFullCard/WordFullCard";

const TrainingPage = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [exercisesNumber, setExercisesNumber] = useState(10);
  const [tasksContent, setTasksContent] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [answerPlaceholder, setAnswerPlaceholder] = useState("");
  const [wordCard, setWordCard] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  useEffect(() => {
    TrainService.getTrain(exercisesNumber).then((e) => {
      setTasksContent(e);
      setIsLoading(false);
    });
  }, []);

  function submitAnswer(e) {
    if (!(e.key === "Enter") && e?.key) {
      return;
    }

    if (userAnswer === tasksContent[currentTaskIndex].word.word) {
      handleCorrectAnswer();
    } else {
      handleInCorrectAnswer();
    }
  }

  function handleCorrectAnswer() {
    setCurrentTaskIndex((prevState) => prevState + 1);
    setUserAnswer("");
    setAnswerPlaceholder("");
  }

  function handleInCorrectAnswer() {
    if (userAnswer === "" && !wordCard) {
      setAnswerPlaceholder("Please enter your answer");
      setUserAnswer("");
    } else if (!wordCard) {
      setAnswerPlaceholder("");
      setIsInputDisabled(true);
      setWordCard(true);
    } else {
      setAnswerPlaceholder("");
      setIsInputDisabled(false);
      setUserAnswer("");
      setWordCard(false);
      setTasksContent((tasks) => {
        let tmpTasks = [...tasks];
        const removedElement = tmpTasks.splice(currentTaskIndex, 1)[0];
        tmpTasks.push(removedElement);
        return tmpTasks;
      });
    }
  }
  const wordFullCard = (
    <div className={classes.wordCardWrapper}>
      <WordFullCard sense={tasksContent[currentTaskIndex]} />
    </div>
  );
  const exercise = (
    <DefineWordExercise exerciseContent={tasksContent[currentTaskIndex]} />
  );

  const main = (
    <div className={classes.trainContent}>
      {wordCard ? wordFullCard : exercise}
      <AnswerInput
        userAnswer={userAnswer}
        placeholder={answerPlaceholder}
        setUserAnswer={setUserAnswer}
        onKeyDown={submitAnswer}
        disabled={isInputDisabled}
      />
      <div className={classes.progressWrapper}>
        <ProgressBar
          style={{ flexDirection: "row-reverse" }}
          value={currentTaskIndex}
          total={exercisesNumber}
        />
        <img
          src={next_icon}
          onClick={submitAnswer}
          className={classes.nextButton}
        />
      </div>
    </div>
  );

  return (
    <>
      <Header />
      {isLoading ? <Loading /> : main}
    </>
  );
};

export default TrainingPage;
