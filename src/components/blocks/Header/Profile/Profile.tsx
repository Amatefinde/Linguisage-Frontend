import React, { useContext, useState } from "react";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../../http/services/AuthService";
import ReactLogo from "./profile_icon.svg";

const Profile = ({ image }) => {
  // const { isLogged, setIsLogged } = useContext(ApplicationContext);
  const navigate = useNavigate();

  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <>
      <div className={classes.wrapper} onClick={() => {
        AuthService.logout().finally(
            () => navigate("/")
        )
      }}>
        <div
          className={classes.profileButton}
        >
          <div className={classes.imageWrapper}>
            <img src={ReactLogo} alt={"profile img"} className={classes.img} />
          </div>
          <div className={classes.arrow}>
            <svg
              width="24"
              height="14"
              viewBox="0 0 24 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 2L12 10.5L22 2" stroke="#a0d5e2" strokeWidth="4" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
