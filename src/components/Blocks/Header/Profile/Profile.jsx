import React, { useContext } from "react";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../App";
import AuthService from "../../../../services/AuthService";

const Profile = ({ image }) => {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div
      className={classes.Profile}
      onClick={() => {
        AuthService.logout()
          .then(() => {
            navigate("/");
            setIsLogged(false);
          })
          .catch((e) => {
            console.log(e);
          });
      }}
    >
      <div className={classes.Adidas}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="32"
          viewBox="0 0 36 32"
          fill="none"
        >
          <path
            d="M2 2H33.5"
            stroke="#C9C9C9"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M2 16H33.5"
            stroke="#C9C9C9"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M2 30H33.5"
            stroke="#C9C9C9"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div className={classes.UserImage}></div>
    </div>
  );
};

export default Profile;
