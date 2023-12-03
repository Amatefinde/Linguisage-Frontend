import React, { useState } from "react";
import classes from "./Sense.module.css";
import { motion } from "framer-motion";
import Tabs from "../../../../ui/Tabs/Tabs";
import "./SenseRowExamples.css";

const Sense = ({ sense, activeSenseId, setActiveSenseId }) => {
  let tabs = [
    { id: "definition", label: "Definition", content: sense.definition },
    {
      id: "examples",
      label: "Examples",
      content: (
        <ul style={{ marginLeft: "15px" }}>
          {sense.row_examples.map((elem) => {
            return (
              <p dangerouslySetInnerHTML={{ __html: elem.row_example }}></p>
            );
          })}
        </ul>
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  let title;
  if (sense.short_cut && sense.lvl) {
    title = `${sense.lvl} | ${sense.short_cut}`;
  } else if (sense.lvl || sense.short_cut) {
    title = sense.lvl || sense.short_cut;
  } else {
    title = "";
  }
  return (
    <div
      className={classes.mainWidget}
      onClick={(e) => {
        setActiveSenseId(sense.id);
      }}
      style={{
        border:
          activeSenseId === sense.id
            ? `solid #7EA2FF 3px`
            : `solid #D4D4D4 3px`,
      }}
    >
      <div className={classes.title}>{title}</div>
      <Tabs
        tabs={tabs}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        id={sense.id}
      />
      <div className={classes.definition}>{activeTab.content}</div>
    </div>
  );
};
export default Sense;
