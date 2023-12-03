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
            <li key={elem.id}>{elem.content}</li>
          ))}
        </ul>
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div
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
      <div className={classes.definition}>{activeTab.content}</div>
    </div>
  );
};
export default Meaning;
