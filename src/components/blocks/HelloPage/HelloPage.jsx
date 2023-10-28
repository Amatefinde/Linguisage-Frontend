import React, {useState} from 'react';
import classes from "./HelloPage.module.css";
import Modal from "../../ui/Modal/Modal";
import InputField from "../../ui/InputField/InputField";
import InputBlock from "../../ui/InputBlock/InputBlock";
import AccentButton from "../../ui/Buttons/AccentButton/AccentButton";
import {useNavigate} from "react-router-dom";


const HelloPage = () => {
    const [modalActive, setModalActive]= useState(false)
    const [textEmail, setTextEmail] = useState("")
    const [textPassword, setTextPassword] = useState("")
    const navigate = useNavigate()


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
                <div className={classes.test}>
                    <InputBlock
                        placeholder={"ivan@example.com"}
                        text={textEmail}
                        setText={setTextEmail}
                        name={"Email address"}
                        type={"email"}
                    />

                    <InputBlock
                        placeholder={"qwerty123"}
                        text={textPassword}
                        setText={setTextPassword}
                        name={"Password"}
                        type={"password"}
                    />
                    <AccentButton
                        callback={() => navigate('/profile')}
                    >
                        Log in
                    </AccentButton>


                </div>
            </Modal>
        </div>
)
    ;
};

export default HelloPage;