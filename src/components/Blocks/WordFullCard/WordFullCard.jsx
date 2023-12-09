import React from "react";
import classes from "./WordFullCard.module.css";
import capitalizeFirstLetter from "../../../utils/strings";

const WordFullCard = ({ sense }) => {
  return (
    <div className={classes.block}>
      <div className={classes.content}>
        <div className={classes.wordTitle}>
          {capitalizeFirstLetter(sense.word.word)}
        </div>
        <div className={classes.wordDefinition}>{sense.definition}</div>
        <div className={classes.separatorWrapper}>
          <div className={classes.separator}></div>
        </div>
        <div className={classes.additionalContent}>
          <div className={classes.images}>
            {sense.images.map((img) => (
              <img
                className={classes.img}
                key={img.id}
                src={"http://" + img.img}
              />
            ))}
          </div>
          <div className={classes.examplesTitle}>Examples:</div>
          <div className={classes.examples}>
            {sense.row_examples.map((row_example) => (
              <span
                dangerouslySetInnerHTML={{ __html: row_example.row_example }}
              ></span>
            ))}
          </div>
        </div>
        <div className={classes.progress}></div>
      </div>
    </div>
  );
};

export default WordFullCard;
