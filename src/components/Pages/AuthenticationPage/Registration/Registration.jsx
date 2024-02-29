import React, { useContext, useState } from "react";
import classes from "./Registration.module.css";
import { useNavigate } from "react-router-dom";
import InputBlock from "../../../ui/InputBlock/InputBlock";
import AccentButton from "../../../ui/Buttons/AccentButton/AccentButton";
import Checkbox from "../../../ui/Checkbox/Checkbox";
import { useForm } from "react-hook-form";
import { FormContext } from "../HelloPage";
import { ApplicationContext } from "../../../../App";
import AuthService from "../../../../http/services/AuthService";

const Registration = () => {
  const [textEmail, setTextEmail] = useState("");
  const [textName, setTextName] = useState("");
  const [textPassword, setTextPassword] = useState("");
  const [isUserAgree, setIsUserAgree] = useState(false);
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(ApplicationContext);
  const [serverError, setServerError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    const { email, password, username } = data;
    try {
      await AuthService.register(email, password, username);
      const response = await AuthService.login(email, password);
      setIsLogged(true);
      localStorage.setItem("token", response["access_token"]);
      navigate("/profile");
    } catch (e) {
      setServerError(e.response.data.detail);
    }
  }
  const { form, setForm } = useContext(FormContext);

  return (
    <div className={classes.main}>
      <form className={classes.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={classes.title}>Sign Up</div>
          <InputBlock
            register={register("email", {
              required: "Email is a required parameter",
              pattern: { value: regexEmail, message: "Invalid email" },
            })}
            placeholder={"ivan@example.com"}
            text={textEmail}
            setText={setTextEmail}
            name={"Email address"}
            type={"text"}
          />

          <InputBlock
            register={register("username", {
              required: "Enter your name",
              maxLength: 80,
            })}
            placeholder={"Лёня Папирос"}
            text={textName}
            setText={setTextName}
            name={"Your name"}
            type={"text"}
          />

          <InputBlock
            register={register("password", {
              required: "Enter your password",
              minLength: {
                value: 8,
                message: "Minimum password length is 8 characters",
              },
            })}
            placeholder={"qwerty123"}
            text={textPassword}
            setText={setTextPassword}
            name={"Password"}
            type={"password"}
          />
          <Checkbox
            register={register("agree", {
              required: "Accept the terms of the agreement",
            })}
            name={"I have agree user agreement"}
            setIsChecked={setIsUserAgree}
            isChecked={isUserAgree}
          />
          <div className={classes.error}>
            {errors?.email?.message ||
              errors?.username?.message ||
              errors?.password?.message ||
              errors?.agree?.message ||
              serverError}
          </div>
          <div>
            <AccentButton>Sign Up</AccentButton>
          </div>
        </div>

        <span
          className={classes.signInButton}
          onClick={() => setForm("singIn")}
        >
          Sign in
        </span>
      </form>
    </div>
  );
};

export default Registration;
