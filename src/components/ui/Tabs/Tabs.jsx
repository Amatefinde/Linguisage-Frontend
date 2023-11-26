import React from "react";
import classes from "./Tabs.module.css";
import { motion } from "framer-motion";

const Tabs = ({ tabs, activeTab, setActiveTab, id }) => {
  return (
    <div className={classes.selectContent}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={classes.contentOption}
          onClick={(e) => {
            setActiveTab(tab);
            e.stopPropagation();
          }}
          style={tab.id === activeTab.id ? { color: "#5280DB" } : {}}
        >
          {tab.id === activeTab.id ? (
            <motion.div
              layoutId={`${id}`}
              className={classes.active}
            ></motion.div>
          ) : (
            <div className={classes.inactive}></div>
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
