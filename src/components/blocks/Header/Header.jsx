import React from 'react';
import classes from "./Header.module.css"
import Profile from "./Profile/Profile";


const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.ContentWrapper}>
                <div className={classes.Logotype}>
                    <div className={classes.LogoLogo}></div>
                    <div className={classes.LogoText}>Linguisage</div>
                </div>
                <Profile/>
            </div>
        </header>
    );
};

export default Header;