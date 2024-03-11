import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./Modal.module.css";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Modal = ({ showModal, setShowModal, children }) => {
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

export default Modal;
