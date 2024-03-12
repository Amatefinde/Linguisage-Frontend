import React, {useEffect, useState} from 'react';
import Header from "../../blocks/Header/Header.tsx";
import SearchAndFilters from "./SearchAndFilters/SearchAndFilters.tsx";
import classes from "./DictionaryPage.module.css"
import Sheet from "@mui/joy/Sheet";
import SenseCardList from "./SenseCardList/SenseCardList.tsx";
import WordService from "../../../http/services/WordService.ts";
import {IUserSenses} from "../../../types/UserSensesInterface.ts";
import ImageCarousel from "./SenseCard/ImageCarousel/ImageCarousel.tsx";

const DictionaryPage = () => {
    const [senses, setSenses] = useState<IUserSenses | null>(null)
    const [isloading, setIsloading] = useState<boolean>(true)

    useEffect(() => {
        try {
            async function fetchSense() {
                const fetchedSense = await WordService.getMySenses()
                setSenses(fetchedSense)
            }
            fetchSense()
        } catch (e) {
            console.log("Во время фетча словаря пользователя произошла ошибка:", e)
        }

    }, []);

    return (
        <>
            <Header/>
            <div className={classes.container}>
                <SearchAndFilters/>
                <SenseCardList senses={senses}/>
            </div>
        </>
    );
};

export default DictionaryPage;