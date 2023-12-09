import classes from "./DefineWordWithHorizontalPicture.module.css";

import React, { useEffect, useState } from "react";
import pickTwoRandom from "../utils";

const sense = {
  id: 20284,
  lvl: "B2",
  short_cut: null,
  definition:
    "the amount of space that an object or a substance fills; the amount of space that a container has",
  examples: [
    {
      example: "How do you measure the volume of a gas?",
    },
    {
      example:
        "In the experiment, lighted candles were put under jars of different volumes.",
    },
    {
      example: "Patients showed an improvement in lung volume.",
    },
    {
      example:
        "Wait until the dough doubles in volume before kneading it again.",
    },
  ],
  row_examples: [
    {
      row_example:
        '<li class="" htag="li"> <span class="cf" hclass="cf" htag="span">volume of something</span> <span class="x">How do you measure the volume of a gas?</span></li>',
    },
    {
      row_example:
        '<li class="" htag="li"><span class="x">In the experiment, lighted candles were put under jars of different volumes.</span></li>',
    },
    {
      row_example:
        '<li class="" htag="li"><span class="x">Patients showed an improvement in <span class="cl">lung volume</span>.</span></li>',
    },
    {
      row_example:
        '<li class="" htag="li"><span class="x">Wait until the dough doubles in volume before kneading it again.</span></li>',
    },
  ],
  images: [
    {
      id: 220781,
      img: "94.241.143.82:8100/static/word_images/volume__theamountofspacethatanobjectorasubstancefi__1.jpg",
    },
    {
      id: 220785,
      img: "94.241.143.82:8100/static/word_images/volume__theamountofspacethatanobjectorasubstancefi__5.jpg",
    },
  ],
  word: {
    word: "volume",
  },
};

const DefineWordWithHorizontalPicture = () => {
  const [img, setImg] = useState();
  const [examples, setExamples] = useState([]);

  useEffect(() => {
    if (!!sense.images.length) {
      const randomIndex = Math.floor(Math.random() * sense.images.length);
      setImg("http://" + sense.images[randomIndex].img);
    }
    if (!!sense.row_examples.length) {
      setExamples(pickTwoRandom(sense.row_examples));
    }
  }, []);

  console.log(img);
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
            <div className={classes.definition}>{sense.definition}</div>
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
