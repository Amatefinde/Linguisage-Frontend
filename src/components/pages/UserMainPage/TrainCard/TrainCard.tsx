import React, {useState} from 'react';
import classes from "./TrainCard.module.css"
import YellowButton from "../../../ui/Buttons/YellowButton/YellowButton";
import {useNavigate} from "react-router-dom";


const TrainCard = () => {

    const [logoColor, setLogoColor] = useState('#929292');
    const [textColor, setTextColor] = useState('#929292');

    const handleMouseEnter = () => {
        setLogoColor("#7EA2FF")
        setTextColor("#4B4B4B")
    }
    const handleMouseLeave = () => {
        setLogoColor("#929292")
        setTextColor("#929292")
    }

    const navigate = useNavigate();


    return (
        <section className={classes.UploadBooks}
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
        >
            <div className={classes.Wrapper}>
                <div className={classes.Text}>
                    <div className={classes.Title}>Immersive training</div>
                    <div className={classes.SubTitle}>Time to flex your English muscles</div>
                </div>
                <YellowButton onClick={() => navigate("/training")}>Let's go!</YellowButton>
            </div>
        </section>
    );
};

export default TrainCard;