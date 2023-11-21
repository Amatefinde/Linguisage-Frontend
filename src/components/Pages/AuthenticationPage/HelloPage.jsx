import React, { createContext, useContext, useEffect, useState } from "react";
import classes from "./HelloPage.module.css";
import Modal from "../../ui/Modal/Modal";
import Registration from "./Registration/Registration";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../UserMainPage/Home";
import Login from "./Login/Login";
import { ApplicationContext } from "../../../App";
export const FormContext = createContext(null);

const HelloPage = () => {
  const [modalActive, setModalActive] = useState(false);

  const [form, setForm] = useState("signIn");

  const navigate = useNavigate();
  const { isLogged, setLogged } = useContext(ApplicationContext);

  useEffect(() => {
    if (isLogged) {
      navigate("/profile");
    }
  }, []);

  let currentForm;
  switch (form) {
    case "signIn":
      currentForm = <Login />;
      break;
    case "signUp":
      currentForm = <Registration />;
      break;
    case "forget":
      currentForm = <Login />;
      break;
    default:
      currentForm = <Login />;
  }

  return (
    <div>
      <header
        className={classes.HelloHead}
        onClick={() => setModalActive(true)}
      >
        <div className={classes.SiteTitle}>Linguisage</div>
        <div className={classes.SiteLogo}></div>
      </header>
      <section className={classes.Other}></section>
      <Modal active={modalActive} setActive={setModalActive}>
        <FormContext.Provider value={{ form, setForm }}>
          {currentForm}
        </FormContext.Provider>
      </Modal>
    </div>
  );
};

export default HelloPage;
