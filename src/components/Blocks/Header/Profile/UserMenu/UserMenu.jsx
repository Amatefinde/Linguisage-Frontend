import React from "react";
import classes from "./UserMenu.module.css";
import userLogo from "../../../../icons/user.svg";
import helpLogo from "../../../../icons/help.svg";
import settingsLogo from "../../../../icons/settings.svg";
import exitLogo from "../../../../icons/exit.svg";

const UserMenu = () => {
  return (
    <nav className={classes.wrapper}>
      <div className={classes.option}>
        <img className={classes.img} src={userLogo} alt={"userLogo"} />{" "}
        <div className={classes.text}>Profile</div>
      </div>

      <div className={classes.option}>
        <img className={classes.img} src={settingsLogo} alt={"settingsLogo"} />{" "}
        <div className={classes.text}>Settings</div>
      </div>

      <div className={classes.option}>
        <img className={classes.img} src={helpLogo} alt={"helpLogo"} />{" "}
        <div className={classes.text}>Help</div>
      </div>

      <div className={classes.option}>
        <img className={classes.img} src={exitLogo} alt={"exitLogo"} />{" "}
        <div className={classes.text}>Exit</div>
      </div>
    </nav>
  );
};

export default UserMenu;
