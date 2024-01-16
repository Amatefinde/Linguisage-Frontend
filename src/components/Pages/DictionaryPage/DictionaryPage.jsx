import React, {useContext, useEffect, useState} from "react";
import classes from "./DictionaryPage.module.css";
import Header from "../../Blocks/Header/Header";
import SenseCard from "../../Blocks/SenceCard/SenseCard";
import WordService from "../../../services/WordService";
import ModalFramer from "../../ui/ModalFramer/ModalFramer";
import WordFullCard from "../../Blocks/WordFullCard/WordFullCard";
import Loading from "../../Blocks/Loading/Loading";
import DictionarySearch from "./SearchAndSort/DictionarySearch/DictionarySearch";
import DropDownMenu from "./SearchAndSort/ManageBlock/DropDownMenu/DropDownMenu";
import AddWord from "../../Blocks/AddWord/AddWord";
import {ApplicationContext} from "../../../App";

const DictionaryPage = () => {
    const [userSenses, setUserSenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        WordService.getMySenses()
            .then((data) => {
                data.forEach(obj => obj.created_at = new Date(obj.created_at))
                setUserSenses(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const [showModalSense, setShowModalSense] = useState(false);
    const [showModalAddWord, setShowModalAddWord] = useState(false)
    const [openedSense, setOpenedSense] = useState(null);
    const [filteredUserSenses, setFilteredUserSenses] = useState(userSenses)
    const [searchedUserSenses, setSearchedUserSenses] = useState(filteredUserSenses)

    const sortConfig = {
        defaultValue: {
            optionName: "date added",
            value: "created_at"
        },
        options: [
            {
                optionName: "date added",
                value: "created_at",
            },
            {
                optionName: "alphabetically",
                value: "word.word",
            },
            {
                optionName: "progress",
                value: "score",
            },

        ]
    }

    const not_words = <div className={classes.notWordsWrapper}>
        <div className={classes.notWordsHeader}>Looks like your dictionary is still empty</div>
        <div className={classes.notWords}>You can add unfamiliar words while reading literature by simply highlighting
            them, or use the manual addition button on this page
        </div>
    </div>

    const main = (
        <>
            <ModalFramer showModal={showModalSense} setShowModal={setShowModalSense}>
                <WordFullCard sense={openedSense} inUserProfile/>
            </ModalFramer>
            <ModalFramer showModal={showModalAddWord} setShowModal={setShowModalAddWord}>
                <AddWord setModalActive={setShowModalAddWord}/>
            </ModalFramer>
            <div className={classes.contentBackground}>

                <div className={classes.searchWrapper}>
                    <DictionarySearch
                        setSearchedUserSenses={setSearchedUserSenses}
                        userSenses={filteredUserSenses}
                    />
                </div>
                <div className={classes.manageBlock}>
                    <DropDownMenu
                        label={"Sorted by:"}
                        defaultValue={sortConfig.defaultValue}
                        options={sortConfig.options}
                        list={userSenses}
                        setSortedList={setFilteredUserSenses}
                    />
                    <div
                        className={classes.addWord}
                        onClick={() => setShowModalAddWord(true)}
                    >Add word manually
                    </div>
                </div>
                {userSenses.length ? <div className={classes.senseCardWrapper}>
                    {searchedUserSenses.map((sense) => (
                        <SenseCard
                            key={sense.id}
                            sense={sense}
                            setOpenedSense={setOpenedSense}
                            setShowModal={setShowModalSense}
                        />
                    ))}
                </div> : not_words}

            </div>
        </>
    );


    return (
        <>
            <Header/>
            {isLoading ? <Loading/> : main}
        </>
    );
};

export default DictionaryPage;
