import React from "react";
import classes from "./SenseCard.module.css";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import capitalizeFirstLetter from "../../../utils/strings";

const SenseCard = ({ sense, setOpenedSense, setShowModal }) => {
  function clickHandler() {
    setOpenedSense(sense);
    setShowModal(true);
  }
  console.log(sense.score);
  return (
    <div className={classes.senseCard} onClick={clickHandler}>
      <div className={classes.senseBody}>
        <div className={classes.senseWord}>
          {capitalizeFirstLetter(sense.word.word)}
          <div className={classes.senseDefinition}>{sense.definition}</div>
        </div>
        <img
          src={"http://" + sense.images[0].img}
          className={classes.senseImage}
          alt={"Тут должна быть изображения"}
        />
      </div>
      <ProgressBar percent={Math.round(sense.score * 100)} />
    </div>
  );
};

export default SenseCard;
