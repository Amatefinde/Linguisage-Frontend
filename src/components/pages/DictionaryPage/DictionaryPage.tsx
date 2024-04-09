import React, {useEffect, useState} from 'react';
import Header from "../../blocks/Header/Header.tsx";
import SearchAndFilters from "./SearchAndFilters/SearchAndFilters.tsx";
import classes from "./DictionaryPage.module.css"
import Sheet from "@mui/joy/Sheet";
import SenseCardList from "./SenseCardList/SenseCardList.tsx";
import WordService from "../../../http/services/WordService.ts";
import {IUserSenses} from "../../../types/UserSensesInterface.ts";
import ImageCarousel from "./SenseCard/ImageCarousel/ImageCarousel.tsx";
import AddWord from "../../blocks/AddWord/AddWord";
import ModalJoyStyled from "../../ui/ModalJoyStyled/ModalJoyStyled";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {setUserSenses} from "../../../store/userSenses/userSensesSlice";
import LoaderForPage from "../../ui/LoaderForPage/LoaderForPage.tsx";

const DictionaryPage = () => {


    const senses = useSelector((state: RootState) => state.userSense.senses)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAddWordOpen, setIsAddWordOpen] = useState<boolean>(false)






    return (
        <>
            <ModalJoyStyled open={isAddWordOpen} onClose={() => setIsAddWordOpen(false)}>
                <AddWord onClose={() => setIsAddWordOpen(false)}/>
            </ModalJoyStyled>
            <Header/>
            <div className={classes.container}>
                <SearchAndFilters setIsAddWordOpen={setIsAddWordOpen} setIsLoading={setIsLoading}/>
                {isLoading ? <LoaderForPage/> : <div className={"smoothAppear"}><SenseCardList senses={senses} /></div>}
            </div>
        </>
    );
};

export default DictionaryPage;