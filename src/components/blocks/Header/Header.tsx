import React, { useContext } from "react";
import classes from "./Header.module.css";
import Profile from "./Profile/Profile";
import { useNavigate } from "react-router-dom";
// import { ApplicationContext } from "../../../App";

const Header = () => {
  const navigate = useNavigate();
  // const { currentPage, setCurrentPage } = useContext(ApplicationContext);

  const toLiterature = () => {
    // navigate("/literature");
  };

  const toProfile = () => {
    navigate("/home");
  };

  const toDictionary = () => {
    navigate("/dictionary");
  };

  const toTraining = () => {
    // navigate("/training");
  };

  return (
    <header className={classes.header}>
      <div className={classes.ContentWrapper}>
        <div className={classes.navGeneralBar}>
          <div className={classes.Logotype} onClick={toProfile}>
            <div className={classes.LogoLogo}></div>
            <div className={classes.LogoText}>Linguisage</div>
          </div>
          <nav className={classes.navBar}>
            <div
              className={[
                classes.navButton,
                window.location.pathname === "/literature" && classes.active,
              ].join(" ")}
              onClick={toLiterature}
            >
              Library
            </div>
            <div
              className={[
                classes.navButton,
                window.location.pathname === "/training" && classes.active,
              ].join(" ")}
              onClick={toTraining}
            >
              Training
            </div>
            <div
              className={[
                classes.navButton,
                window.location.pathname === "/dictionary" && classes.active,
              ].join(" ")}
              onClick={toDictionary}
            >
              Dictionary
            </div>
          </nav>
        </div>
        <Profile />
      </div>
    </header>
  );
};
export default Header;
