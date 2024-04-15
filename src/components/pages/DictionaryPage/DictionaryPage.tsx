import React, {useMemo, useState} from 'react';
import Header from "../../blocks/Header/Header.tsx";
import SearchAndFilters from "./SearchAndFilters/SearchAndFilters.tsx";
import classes from "./DictionaryPage.module.css"
import SenseCardList from "./SenseCardList/SenseCardList.tsx";
import AddWord from "../../blocks/AddWord/AddWord";
import ModalJoyStyled from "../../ui/ModalJoyStyled/ModalJoyStyled";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import LoaderForPage from "../../ui/LoaderForPage/LoaderForPage.tsx";
import {IUserSense} from "../../../types/UserSensesInterface.ts";
import ISenseFilter from "../../../types/ISenseFilter.ts";

const DictionaryPage: React.FC = () => {
    const senses = useSelector((state: RootState) => state.userSense.senses)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAddWordOpen, setIsAddWordOpen] = useState<boolean>(false)
    const [filter, setFilter] = useState<ISenseFilter>({created_at: "new"})

    const filteredSenses = useMemo(() => {
        const sensesCopy = senses.slice();
        sensesCopy.sort((a: IUserSense, b: IUserSense) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            if (filter.created_at == "old") {
                return dateA.getTime() - dateB.getTime();
            } else {
                return dateB.getTime() - dateA.getTime();
            }

        })

        return sensesCopy
    }, [senses.map(s => s), filter]);

    return (
        <>
            <ModalJoyStyled open={isAddWordOpen} onClose={() => setIsAddWordOpen(false)}>
                <AddWord onClose={() => setIsAddWordOpen(false)}/>
            </ModalJoyStyled>
            <Header/>
            <div className={classes.container}>
                <SearchAndFilters filter={filter} setFilter={setFilter} setIsAddWordOpen={setIsAddWordOpen}
                                  setIsLoading={setIsLoading}/>
                {isLoading ? <LoaderForPage/> :
                    <div className={"smoothAppear"}><SenseCardList senses={filteredSenses}/></div>}
            </div>
        </>
    );
};

export default DictionaryPage;