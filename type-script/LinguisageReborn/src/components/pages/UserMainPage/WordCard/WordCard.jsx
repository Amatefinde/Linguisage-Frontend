import React, { useState } from "react";
import classes from "./WordCard.module.css";
import OneSizeBlock from "../OneSizeBlock/OneSizeBlock";
import "../../../../fontStyles.css";

const WordCard = ({ sense }) => {
  return (

    <OneSizeBlock>
      <div className={classes.Text}>
        <div className={classes.Title}>
          <span className="titleFont">{sense.word.word}</span>
        </div>
        <div
          className="unimportantFont"
          style={{ textAlign: "center", padding: "20px" }}
        >
          {sense.definition}
        </div>
      </div>
    </OneSizeBlock>
  );
};

export default WordCard;
