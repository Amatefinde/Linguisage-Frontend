import React, {useState} from 'react';
import classes from "./HelloPage.module.css";
import Modal from "../../ui/Modal/Modal";
import Registration from "./Registration/Registration";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../UserMainPage/Home";
import Login from "./Login/Login";


const HelloPage = () => {
    const [modalActive, setModalActive] = useState(false)


    return (
        <div>
            <header className={classes.HelloHead} onClick={
                () => setModalActive(true)
            }>
                <div className={classes.SiteTitle}>Linguisage</div>
                <div className={classes.SiteLogo}>
                </div>
            </header>
            <section className={classes.Other}>
            </section>
            <Modal active={modalActive} setActive={setModalActive}>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/authorization" element={<Login/>}/>
            </Modal>
        </div>
    )
        ;
};

export default HelloPage;