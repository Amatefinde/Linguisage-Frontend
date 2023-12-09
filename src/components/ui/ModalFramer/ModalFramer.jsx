import React, { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import classes from "./ModelFramer.module.css";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const ModalFramer = ({ showModal, setShowModal, children }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className={classes.backdrop}
          variants={backdrop}
          transition={{ ease: "easeOut", duration: 0.18 }}
          initial={"hidden"}
          animate={"visible"}
          exit={"hidden"}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ y: 2, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -20, scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalFramer;
