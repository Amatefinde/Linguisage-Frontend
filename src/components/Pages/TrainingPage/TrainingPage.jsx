import React, { useEffect, useState } from "react";
import classes from "./TrainingPage.module.css";
import Header from "../../Blocks/Header/Header";
import DefineWordExercise from "./Exercises/DefineWordExercise/DefineWordExercise";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import next_icon from "../../icons/next_arrow.svg";
import AnswerInput from "./Exercises/DefineWordExercise/AnswerInput/AnswerInput";
import TrainService from "../../../services/TrainService";
import Loading from "../../Blocks/Loading/Loading";
import WordFullCard from "../../Blocks/WordFullCard/WordFullCard";
import TrainingEnd from "./TrainingEnd/TrainingEnd";

const TrainingPage = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [exercisesNumber, setExercisesNumber] = useState(5);
  const [tasksContent, setTasksContent] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [answerPlaceholder, setAnswerPlaceholder] = useState("");
  const [wordCard, setWordCard] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [trainStrike, setTrainStrike] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    TrainService.getTrain(exercisesNumber)
      .then((e) => {
        setTasksContent(e);
        setCurrentTaskIndex(0);
      })
      .finally(() => setIsLoading(false));
  }, [trainStrike]);

  function submitAnswer(e) {
    if (e?.key && !(e.key === "Enter")) {
      return;
    }
    const right_answer = tasksContent[currentTaskIndex].word.word
    if (userAnswer.toLowerCase().trim() === right_answer.toLowerCase().trim()) {
      handleCorrectAnswer();
    } else {
      handleInCorrectAnswer();
    }
  }

  function handleCorrectAnswer() {
    TrainService.addAnswer(tasksContent[currentTaskIndex].id, true).then(
      (e) => {},
    );
    setCurrentTaskIndex((prevState) => prevState + 1);
    setUserAnswer("");
    setAnswerPlaceholder("");
  }

  function handleInCorrectAnswer() {
    TrainService.addAnswer(tasksContent[currentTaskIndex].id, false).then(
      (e) => {},
    );
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
    <>
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
    </>
  );

  let page;
  if (isLoading) {
    page = <Loading style={{ color: "#7EA2FF" }} />;
  } else if (exercisesNumber === currentTaskIndex) {
    page = <TrainingEnd setTrainStrike={setTrainStrike} />;
  } else {
    page = main;
  }

  const not_words = <div className={classes.notWordsWrapper}><div className={classes.notWords}>
    Looks like you don't have any more
    words in your dictionary that need practicing.
  </div></div>


  return (
    <>
      <Header />
      {tasksContent.length || isLoading ? <div className={classes.trainContent}>{page}</div> : not_words}

    </>
  );
};

export default TrainingPage;
