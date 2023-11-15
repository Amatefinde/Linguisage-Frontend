import React, {useContext, useEffect, useState} from 'react';
import classes from "./Login.module.css";
import {useNavigate} from "react-router-dom";
import InputBlock from "../../../ui/InputBlock/InputBlock";
import AccentButton from "../../../ui/Buttons/AccentButton/AccentButton";
import Checkbox from "../../../ui/Checkbox/Checkbox";
import {useForm} from "react-hook-form";
import {FormContext} from "../HelloPage";
import {AuthContext} from "../../../../App";
import AuthService from "../../../../services/AuthService";


const Login = () => {
    const [textEmail, setTextEmail] = useState("")
    const [textPassword, setTextPassword] = useState("")
    const [isUserAgree, setIsUserAgree] = useState(false)
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const {form, setForm} = useContext(FormContext)
    const navigate = useNavigate()
    const {isLogged, setIsLogged} = useContext(AuthContext)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [serverError, setServerError] = useState("")

    async function onSubmit(data) {
        const {email, password} = data
        try {
            const response = await AuthService.login(email, password)
            setIsLogged(true)
            localStorage.setItem("token", response["access_token"])
            navigate("/profile")
        } catch (e) {
            setServerError(e?.response?.data?.detail)
        }
    }

    return (
        <form className={classes.wrapper} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className={classes.title}>Sign In</div>
                <InputBlock

                    register={register("email", {
                        required: "Email is a required parameter",
                        pattern: {value: regexEmail, message: "Invalid email"}
                    })}
                    placeholder={"ivan@example.com"}
                    text={textEmail}
                    setText={setTextEmail}
                    name={"Email address"}
                    type={"text"}
                />

                <div className={classes.space}></div>
                <InputBlock
                    register={register("password", {
                        required: "Enter your password",
                        minLength: {value: 8, message: "Minimum password length is 8 characters"}
                    })}
                    placeholder={"qwerty123"}
                    text={textPassword}
                    setText={setTextPassword}
                    name={"Password"}
                    type={"password"}
                />
                <Checkbox
                    register={register("stayInSystem")}
                    name={"Stay in system"}
                    setIsChecked={setIsUserAgree}
                    isChecked={isUserAgree}
                />
                <div className={classes.error}>{
                    errors?.email?.message
                    || errors?.username?.message
                    || errors?.password?.message
                    || errors?.agree?.message
                    || serverError
                }</div>
                <div>
                    <AccentButton>
                        Log in
                    </AccentButton>
                </div>
            </div>
            <span className={classes.signInButton} onClick={() => setForm("signUp")}>Sign Up</span>
        </form>

    )
        ;
};

export default Login;