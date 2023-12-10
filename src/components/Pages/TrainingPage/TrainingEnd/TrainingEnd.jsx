import React from "react";
import classes from "./TrainingEnd.module.css";
import { motion } from "framer-motion";

const TrainingEnd = ({ setTrainStrike }) => {
  function callNewTrain() {
    setTrainStrike((e) => e + 1);
  }

  return (
    <motion.main
      className={classes.wrapper}
      layout
      initial={{ rotate: 160, scale: 0.3 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <section className={classes.title}>Training complete!</section>
      <section className={classes.optionsWrapper}>
        <nav className={classes.options}>
          <span className={classes.option} onClick={callNewTrain}>
            Start another one
          </span>
          <span className={classes.option}>Go to the dictionary</span>
          <span className={classes.option}>Back to home page</span>
        </nav>
      </section>
    </motion.main>
  );
};

export default TrainingEnd;
