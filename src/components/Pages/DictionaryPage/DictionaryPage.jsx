import React, { useEffect, useState } from "react";
import classes from "./DictionaryPage.module.css";
import Header from "../../Blocks/Header/Header";
import SenseCard from "../../Blocks/SenceCard/SenseCard";
import WordService from "../../../services/WordService";

const DictionaryPage = () => {
  const [userSenses, setUserSenses] = useState([]);

  useEffect(() => {
    WordService.getMySenses().then((data) => {
      setUserSenses(data);
    });
  }, []);

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        {userSenses.map((sense) => (
          <SenseCard key={sense.id} sense={sense} />
        ))}
      </div>
    </>
  );
};

export default DictionaryPage;
