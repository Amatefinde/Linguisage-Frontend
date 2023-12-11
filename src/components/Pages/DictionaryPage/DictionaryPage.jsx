import React, { useEffect, useState } from "react";
import classes from "./DictionaryPage.module.css";
import Header from "../../Blocks/Header/Header";
import SenseCard from "../../Blocks/SenceCard/SenseCard";
import WordService from "../../../services/WordService";
import ModalFramer from "../../ui/ModalFramer/ModalFramer";
import WordFullCard from "../../Blocks/WordFullCard/WordFullCard";
import Loading from "../Loading/Loading";

const DictionaryPage = () => {
  const [userSenses, setUserSenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    WordService.getMySenses()
      .then((data) => {
        setUserSenses(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [openedSense, setOpenedSense] = useState(null);

  const main = (
    <>
      <ModalFramer showModal={showModal} setShowModal={setShowModal}>
        <WordFullCard sense={openedSense} />
      </ModalFramer>
      <div className={classes.contentBackground}>
        <div className={classes.senseCardWrapper}>
          {userSenses.map((sense) => (
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
      <Header />
      {isLoading ? <Loading /> : main}
    </>
  );
};

export default DictionaryPage;
