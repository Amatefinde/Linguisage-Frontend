import React, {createContext, useContext, useEffect, useState} from "react";
import classes from "./AddWord.module.css";
import SenseSearch from "./Search/SenseSearch";
import {ApplicationContext} from "../../../App";
import WordService from "../../../http/services/WordService";
import cleanText from "../../../utils/removePunctuationMarks";
import SensesList from "./SensesList/SensesList";
import ImagesList from "./ImagesList/ImagesList";
import Loading from "../Loading/Loading.js";
import getTrueFields from "../../../utils/getTrueFileds";
import Buttons from "./Buttons/Buttons";
import {get_sense_from_wordContent_by_id} from "./utils";
import {useLocation} from "react-router-dom";


export const ActiveImagesContext = createContext(null);

const AddWord = ({setModalActive}) => {
    const location = useLocation()
    let {currentWord, setCurrentWord, currentContext} = useContext(ApplicationContext);
    const [wordContent, setWordContent] = useState({});
    const [activeSenseId, setActiveSenseId] = useState(null);
    const [query, setQuery] = useState("");
    const [activeImagesId, setActiveImagesId] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [wordError, setWordError] = useState(false)

    const fetchWord = (querySearch = null, context = null) => {
        setActiveSenseId(null)
        setWordError(false)
        if (querySearch === null) {
            querySearch = query
        }
        if (querySearch !== "") {
            setIsLoading(true)

            WordService.getWord(querySearch, context ? context : undefined)
                .then((fetchedWordContent) => {
                    setActiveSenseId(null)
                    setWordContent(fetchedWordContent);
                    setActiveSenseId(fetchedWordContent.current_sense_id);
                })
                .catch((e) => {
                    setWordError(true)
                    console.log(e)
                })
                .finally(() => setIsLoading(false))
        } else {
            setIsLoading(false)
        }
    }


    useEffect(() => {

        let cleanedText;
        if (location.pathname === "/reader") {
            if (currentWord.length === 1) {
                cleanedText = cleanText(currentWord[0].text);
            } else {
                cleanedText = currentWord.map((e) => cleanText(e.text)).join(" ");
            }
            setQuery(cleanedText);
        } else {
            cleanedText = query
        }


        const textContext = location.pathname === "/reader" ? currentContext
            .map((obj) => cleanText(obj.text))
            .join(" ") : "";

    }, [currentWord]);


    const imageList = (
        <ImagesList
            wordContent={wordContent}
            activeSenseId={activeSenseId}
        ></ImagesList>
    );

    const isAlreadyInDictionary = isLoading ? false : get_sense_from_wordContent_by_id(wordContent, activeSenseId)?.user_have

    function addHandler() {
        let literature_id = null
        if (location.pathname === "/reader") {
            literature_id = localStorage.getItem("currentLiteratureID")
        }
        const images_id = getTrueFields(activeImagesId);
        WordService.addSenseToMe(images_id, activeSenseId, literature_id).then(
            setModalActive(false),
        );
    }

    const wordErrorMessage = <div>простите но мы не знаем такого слова</div>
    const component = (
        <ActiveImagesContext.Provider
            value={{
                activeImagesId,
                setActiveImagesId,
            }}
        >
            <div className={classes.mainWidget}>
                <div className={classes.leftSide}>
                    <SenseSearch value={query} setValue={setQuery} doSearch={fetchWord}/>
                    {isLoading ? <Loading style={{color: "#0b569c"}}/> : (wordError ? wordErrorMessage : !activeSenseId || < SensesList
                        wordContent={wordContent}
                        activeSenseId={activeSenseId}
                        setActiveSenseId={setActiveSenseId}
                        />) }

                        </div>
                        <div className={classes.rightSide}>
                    <div className={classes.imagesListWrapper}>
                        {isLoading ? <Loading/> : wordError || !activeSenseId || imageList}
                    </div>
                    <Buttons
                        setModalActive={setModalActive}
                        addHandler={addHandler}
                        isAlreadyInDictionary={isAlreadyInDictionary}
                        isDisabled={!activeSenseId || isLoading || wordError}
                    />
                </div>
            </div>
        </ActiveImagesContext.Provider>
    )
    return component;
};

export default AddWord;
