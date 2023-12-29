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
                setUserSenses(data);
                console.log(data)
            })
            .finally(() => setIsLoading(false));
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [openedSense, setOpenedSense] = useState(null);
    const [searchedUserSenses, setSearchedUserSenses] = useState(userSenses)

    const sortConfig = {
        defaultValue: "Sort by",
        options: [
            {
                optionName: "date added",
                value: "date_add",
            }
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
                        userSenses={userSenses}
                    />
                </div>
                <div className={classes.manageBlock}>
                    <DropDownMenu/>
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
