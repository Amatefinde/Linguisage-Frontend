import React, {useState} from 'react';
import classes from "./Registration.module.css";
import {useNavigate} from "react-router-dom";
import InputBlock from "../../../ui/InputBlock/InputBlock";
import AccentButton from "../../../ui/Buttons/AccentButton/AccentButton";
import Checkbox from "../../../ui/Checkbox/Checkbox";
import {registerUser} from "../Action/userCRUD";
import {useForm} from "react-hook-form";


const Registration = () => {
    const [textEmail, setTextEmail] = useState("")
    const [textName, setTextName] = useState("")
    const [textPassword, setTextPassword] = useState("")
    const [isUserAgree, setIsUserAgree] = useState(false)
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log("Registration", data);
    }

    return (
        <form  className={classes.wrapper} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className={classes.title}>Sign Up</div>
                <InputBlock

                    register ={register("email", {required: "Email is a required parameter", pattern: {value: regexEmail, message: "There is error in email"}})}
                    placeholder={"ivan@example.com"}
                    text={textEmail}
                    setText={setTextEmail}
                    name={"Email address"}
                    type={"text"}
                />

                <InputBlock
                    register ={register("username", {required: "Enter your name", maxLength: 80})}
                    placeholder={"Лёня Папирос"}
                    text={textName}
                    setText={setTextName}
                    name={"Your name"}
                    type={"text"}
                />

                <InputBlock
                    register ={register("password", {required: "Enter your password", minLength: {value: 8, message: "Minimum password length is 8 characters"}})}
                    placeholder={"qwerty123"}
                    text={textPassword}
                    setText={setTextPassword}
                    name={"Password"}
                    type={"password"}
                />
                <Checkbox
                    register={register("agree", {required: "Accept the terms of the agreement"})}
                    name={"I have agree user agreement"}
                    setIsChecked={setIsUserAgree}
                    isChecked={isUserAgree}
                />
                <div className={classes.error}>{errors?.email?.message
                    || errors?.username?.message
                    || errors?.password?.message
                    || errors?.agree?.message
                }</div>
                <div>
                    <AccentButton
                    >
                        Log in
                    </AccentButton>
                </div>
            </div>

            <span className={classes.signInButton}>Sign in</span>
        </form>

    )
        ;
};

export default Registration;