import React, { useContext, useEffect, useState } from "react";
import classes from "./AddWord.module.css";
import Meaning from "./Word/Meaning";
import InputField from "../../ui/InputField/InputField";
import Search from "../../ui/Search/Search";
import { motion } from "framer-motion";
import { ApplicationContext } from "../../../App";
import WordService from "../../../services/WordService";

const wordExample = {
  title: "communication",
  definition: `the system of communication in speech and writing that is used by people of a particular country or area`,
  examples: [
    "a qualification in language teaching",
    "a study of language acquisition in two-year-olds",
    "Language is constantly evolving",
  ],
};

const AddWord = () => {
  const { currentWord, setCurrentWord } = useContext(ApplicationContext);
  const [wordContent, setWordContent] = useState({ meanings: [] });
  const [activeMeaningId, setActiveMeaningId] = useState(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (currentWord.length === 1) {
      WordService.getWord(currentWord[0].text)
        .then((fetchedWordContent) => {
          setQuery(fetchedWordContent.content);
          setWordContent(fetchedWordContent);
          console.log(fetchedWordContent);
        })
        .catch((e) => console.log(e)); // todo
    }
  }, [currentWord]);

  return (
    <div className={classes.mainWidget}>
      <div className={classes.leftSide}>
        <Search value={query} setValue={setQuery} />
        <motion.div className={classes.words} layoutScroll>
          {wordContent?.meanings?.length &&
            wordContent.meanings.map((meaning) => (
              <Meaning
                definition={meaning?.meaning}
                title={meaning?.short_meaning}
                id={meaning?.id}
                examples={meaning?.examples}
                activeMeaningId={activeMeaningId}
                setActiveMeaningId={setActiveMeaningId}
              />
            ))}
          <svg
            id={classes.add}
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.6057 24.6045C11.6057 25.3744 12.2298 25.9985 12.9998 25.9985C13.7697 25.9985 14.3938 25.3744 14.3938 24.6045V14.3933H24.6059C25.3759 14.3933 26 13.7692 26 12.9993C26 12.2293 25.3759 11.6052 24.6059 11.6052H14.3938V1.39408C14.3938 0.624149 13.7697 0 12.9998 0C12.2298 0 11.6057 0.624149 11.6057 1.39408V11.6052H1.39408C0.62415 11.6052 0 12.2293 0 12.9993C0 13.7692 0.62415 14.3933 1.39408 14.3933H11.6057V24.6045Z"
              fill="#DEDEDE"
            />
          </svg>
        </motion.div>
      </div>
      <div className={classes.rightSide}></div>
    </div>
  );
};

export default AddWord;
