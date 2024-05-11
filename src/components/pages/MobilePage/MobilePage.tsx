import React from "react";
import classes from "./MobilePage.module.css";
import HelloPage from "../LandingPage/Slides/HelloPage/HelloPage.tsx";
import Typography from "@mui/joy/Typography";

const MobilePage: React.FC = () => {
    return (
        <section className={classes.wrapper}>
            <HelloPage />
            <Typography
                level={"body-xs"}
                fontSize={"xl"}
                paddingLeft={"8dvw"}
                paddingRight={"8dvw"}
            >
                It looks like you are using a mobile device, unfortunately linguisage does not yet
                have a web version for mobile devices, but you can download our{" "}
                <a
                    style={{ textDecoration: "none" }}
                    href={"https://linguisage.ru:9300/static/linguisage-beta-0.0.1.apk"}
                >
                    mobile application<sup>beta</sup>
                </a>
            </Typography>
        </section>
    );
};

export default MobilePage;
