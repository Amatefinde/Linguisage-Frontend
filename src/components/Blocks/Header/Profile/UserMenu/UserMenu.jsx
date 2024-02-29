import React, { useContext, useRef } from "react";
import classes from "./UserMenu.module.css";
import userLogo from "../../../../icons/user.svg";
import helpLogo from "../../../../icons/help.svg";
import settingsLogo from "../../../../icons/settings.svg";
import exitLogo from "../../../../icons/exit.svg";
import AuthService from "../../../../../http/services/AuthService";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../../../../App";

const UserMenu = ({ isMenuActive, setIsMenuActive }) => {
  const content = useRef();
  const { setIsLogged } = useContext(ApplicationContext);
  const navigate = useNavigate();

  const logOut = () => {
    AuthService.logout()
      .then(() => {
        navigate("/");
        setIsLogged(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  window.onclick = function (event) {};
  return (
    <>
      <nav
        className={[classes.wrapper, isMenuActive && classes.active].join(" ")}
        ref={content}
      >
        <div className={classes.option}>
          <img className={classes.img} src={userLogo} alt={"userLogo"} />{" "}
          <div className={classes.text}>Profile</div>
        </div>

        <div className={classes.option}>
          <img
            className={classes.img}
            src={settingsLogo}
            alt={"settingsLogo"}
          />{" "}
          <div className={classes.text}>Settings</div>
        </div>

        <div className={classes.option}>
          <img className={classes.img} src={helpLogo} alt={"helpLogo"} />{" "}
          <div className={classes.text}>Help</div>
        </div>

        <div className={classes.option} onClick={logOut}>
          <img className={classes.img} src={exitLogo} alt={"exitLogo"} />{" "}
          <div className={classes.text}>Exit</div>
        </div>
      </nav>
    </>
  );
};

export default UserMenu;
