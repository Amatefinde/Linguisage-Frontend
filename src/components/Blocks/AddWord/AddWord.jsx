import React, { useContext, useEffect, useState } from "react";
import classes from "./AddWord.module.css";
import Sense from "./SensesList/Sense/Sense";
import InputField from "../../ui/InputField/InputField";
import Search from "../../ui/Search/Search";
import { motion } from "framer-motion";
import { ApplicationContext } from "../../../App";
import WordService from "../../../services/WordService";
import cleanText from "../../../utils/removePunctuationMarks";
import SensesList from "./SensesList/SensesList";
import ImagesList from "./ImagesList/ImagesList";
import SkeletonButton from "../../ui/Buttons/Button/SkeletonButton";
import AccentButton from "../../ui/Buttons/AccentButton/AccentButton";
import Loading from "../../Pages/Loading/Loading";

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
  const [wordContent, setWordContent] = useState({});
  const [activeSenseId, setActiveSenseId] = useState(null);
  const [query, setQuery] = useState("");
  const [activeImagesId, setActiveImagesId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanedText = cleanText(currentWord[0].text);
    setQuery(cleanedText);
    if (currentWord.length === 1) {
      WordService.getWord(cleanedText)
        .then((fetchedWordContent) => {
          setWordContent(fetchedWordContent);
          console.log(fetchedWordContent);
        })
        .catch((e) => console.log(e)) // todo
        .finally(() => setIsLoading(false));
    }
  }, [currentWord]);

  const imageList = (
    <ImagesList
      wordContent={wordContent}
      activeSenseId={activeSenseId}
    ></ImagesList>
  );
  return (
    <div className={classes.mainWidget}>
      <div className={classes.leftSide}>
        <Search value={query} setValue={setQuery} />
        <SensesList
          wordContent={wordContent}
          activeSenseId={activeSenseId}
          setActiveSenseId={setActiveSenseId}
        />
      </div>
      <div className={classes.rightSide}>
        <div className={classes.imagesListWrapper}>
          {isLoading ? <Loading /> : imageList}
        </div>
        <SkeletonButton />
      </div>
    </div>
  );
};

export default AddWord;
