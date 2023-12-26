import React, {createContext, useContext, useEffect, useState} from "react";
import classes from "./AddWord.module.css";
import Search from "../../ui/Search/Search";
import {ApplicationContext} from "../../../App";
import WordService from "../../../services/WordService";
import cleanText from "../../../utils/removePunctuationMarks";
import SensesList from "./SensesList/SensesList";
import ImagesList from "./ImagesList/ImagesList";
import Loading from "../../Pages/Loading/Loading";
import FilledButton from "../../ui/Buttons/FilledButton/FilledButton";
import EmptyButton from "../../ui/Buttons/EmptyButton/EmptyButton";
import getTrueFields from "../../../utils/getTrueFileds";
import Buttons from "./Buttons/Buttons";
import {get_sense_from_wordContent_by_id} from "./utils";

export const ActiveImagesContext = createContext(null);

const AddWord = ({setModalActive}) => {
    const {currentWord, setCurrentWord, currentContext} = useContext(ApplicationContext);
    const [wordContent, setWordContent] = useState({});
    const [activeSenseId, setActiveSenseId] = useState(null);
    const [query, setQuery] = useState("");
    const [activeImagesId, setActiveImagesId] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cleanedText;
        if (currentWord.length === 1) {
            cleanedText = cleanText(currentWord[0].text);
        } else {
            cleanedText = currentWord.map((e) => cleanText(e.text)).join(" ");
        }
        setQuery(cleanedText);
        const textContext = currentContext
            .map((obj) => cleanText(obj.text))
            .join(" ");

        WordService.getWord(cleanedText, textContext)
            .then((fetchedWordContent) => {
                setWordContent(fetchedWordContent);
                setActiveSenseId(fetchedWordContent.current_sense_id);

            })
            .catch((e) => console.log(e)) // todo
            .finally(() => setIsLoading(false));
    }, [currentWord]);

    const imageList = (
        <ImagesList
            wordContent={wordContent}
            activeSenseId={activeSenseId}
        ></ImagesList>
    );

    const isAlreadyInDictionary = get_sense_from_wordContent_by_id(wordContent, activeSenseId)?.user_have

    function addHandler() {
        const images_id = getTrueFields(activeImagesId);
        WordService.addSenseToMe(images_id, activeSenseId).then(
            setModalActive(false),
        );
    }

    const component = (
        <ActiveImagesContext.Provider
            value={{
                activeImagesId,
                setActiveImagesId,
            }}
        >
            <div className={classes.mainWidget}>
                <div className={classes.leftSide}>
                    <Search value={query} setValue={setQuery}/>
                    <SensesList
                        wordContent={wordContent}
                        activeSenseId={activeSenseId}
                        setActiveSenseId={setActiveSenseId}
                    />
                </div>
                <div className={classes.rightSide}>
                    <div className={classes.imagesListWrapper}>
                        {isLoading ? <Loading/> : imageList}
                    </div>
                    <Buttons
                        setModalActive={setModalActive}
                        addHandler={addHandler}
                        isAlreadyInDictionary={isAlreadyInDictionary}
                    />
                </div>
            </div>
        </ActiveImagesContext.Provider>
    )
    return isLoading ? <Loading/> : component;
};

export default AddWord;
