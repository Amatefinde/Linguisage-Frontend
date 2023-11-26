import React, { useState } from "react";
import classes from "./Word.module.css";
import { motion } from "framer-motion";
import Tabs from "../../../ui/Tabs/Tabs";

const Meaning = ({
  title,
  definition,
  examples,
  id,
  setActiveMeaningId,
  activeMeaningId,
}) => {
  let tabs = [
    { id: "definition", label: "Definition", content: definition },
    {
      id: "examples",
      label: "Examples",
      content: (
        <ul style={{ marginLeft: "15px" }}>
          {examples.map((elem) => (
            <li>{elem}</li>
          ))}
        </ul>
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <motion.div
      className={classes.mainWidget}
      onClick={(e) => {
        setActiveMeaningId(id);
      }}
      style={{
        border:
          activeMeaningId === id ? `solid #7EA2FF 3px` : `solid #D4D4D4 3px`,
      }}
    >
      <div className={classes.title}>{title}</div>
      <Tabs
        tabs={tabs}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        id={id}
      />
      <motion.div
        key={activeTab ? activeTab.id : "empty"}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={classes.definition}
      >
        {activeTab.content}
      </motion.div>
    </motion.div>
  );
};

export default Meaning;
