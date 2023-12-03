import React, { useState } from "react";
import classes from "./SandboxPage.module.css";
import AddWord from "../../Blocks/AddWord/AddWord";
import ModalFramer from "../../ui/ModalFramer/ModalFramer";

const SandboxPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ModalFramer showModal={showModal} setShowModal={setShowModal}>
        <AddWord query={"soul"} />
      </ModalFramer>
      <main className={classes.main} onClick={() => setShowModal(true)}>
        {/*<AddWord />*/}
      </main>
    </>
  );
};

export default SandboxPage;
