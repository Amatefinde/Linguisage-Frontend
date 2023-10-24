import React from 'react';
import classes from "./Profile.module.css"


const Profile = ({image}) => {
    return (
        <div className={classes.Profile}>
            <div className={classes.Adidas}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32" fill="none">
                    <path d="M2 2H33.5" stroke="#C9C9C9" stroke-width="4" stroke-linecap="round"/>
                    <path d="M2 16H33.5" stroke="#C9C9C9" stroke-width="4" stroke-linecap="round"/>
                    <path d="M2 30H33.5" stroke="#C9C9C9" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </div>
            <div  className={classes.UserImage} ></div>
        </div>
    );
};

export default Profile;