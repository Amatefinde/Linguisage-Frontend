import React, {useEffect, useState} from "react";
import classes from "./DictionaryPage.module.css";
import Header from "../../Blocks/Header/Header";
import SenseCard from "../../Blocks/SenceCard/SenseCard";
import WordService from "../../../services/WordService";
import ModalFramer from "../../ui/ModalFramer/ModalFramer";
import WordFullCard from "../../Blocks/WordFullCard/WordFullCard";
import Loading from "../Loading/Loading";
import CompactSearch from "../../ui/Search/CompactSearch";
import DictionarySearch from "./SearchAndSort/DictionarySearch/DictionarySearch";
import DropDownMenu from "./SearchAndSort/ManageBlock/DropDownMenu/DropDownMenu";

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

    const [showModal, setShowModal] = useState(false);
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

    const main = (
        <>
            <ModalFramer showModal={showModal} setShowModal={setShowModal}>
                <WordFullCard sense={openedSense}/>
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
                </div>

                <div className={classes.senseCardWrapper}>
                    {searchedUserSenses.map((sense) => (
                        <SenseCard
                            key={sense.id}
                            sense={sense}
                            setOpenedSense={setOpenedSense}
                            setShowModal={setShowModal}
                        />
                    ))}
                </div>
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
