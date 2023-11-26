import React from "react";
import classes from "./SandboxPage.module.css";
import AddWord from "../../Blocks/AddWord/AddWord";

const WordMenu = () => {
  return (
    <main className={classes.wrapper}>
      <AddWord query={"soul"} />
    </main>
  );
};

export default WordMenu;
