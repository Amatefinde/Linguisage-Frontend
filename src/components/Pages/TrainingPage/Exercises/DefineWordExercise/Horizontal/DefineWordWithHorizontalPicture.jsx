import classes from "./DefineWordWithHorizontalPicture.module.css";

import React, { useEffect, useState } from "react";
import pickTwoRandom from "../utils";
import {protocol} from "../../../../../../config";

const DefineWordWithHorizontalPicture = ({ exerciseContent }) => {
  const [img, setImg] = useState();
  const [examples, setExamples] = useState([]);
  useEffect(
    (e) => {
      if (!!exerciseContent.images.length) {
        const randomIndex = Math.floor(
          Math.random() * exerciseContent.images.length,
        );
        setImg(protocol + exerciseContent?.images[randomIndex]?.img);
      } else {
      }
      if (!!exerciseContent.row_examples_hidden_word.length) {
        setExamples(pickTwoRandom(exerciseContent.row_examples_hidden_word));
      } else {
      }
    },
    [exerciseContent],
  );

  return (
    <main>
      <div className={classes.task}>
        <div className={classes.definitionAndPicture}>
          <img
            className={classes.image}
            src={img}
            alt={"here must be picture"}
          />
          <div className={classes.definitionWrapper}>
            <div className={classes.definitionTitle}>Definition</div>
            <div className={classes.definition}>
              {exerciseContent.definition}
            </div>
          </div>
        </div>
        <div className={classes.examplesWrapper}>
          <div className={classes.examplesTitle}>Examples</div>
          <div className={classes.examples}>
            {examples.map((example) => (
              <div
                className={classes.example}
                dangerouslySetInnerHTML={{ __html: example.row_example }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DefineWordWithHorizontalPicture;
