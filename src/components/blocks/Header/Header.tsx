import React, {useContext} from "react";
import classes from "./Header.module.css";
import Profile from "./Profile/Profile";
import {useNavigate} from "react-router-dom";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import {IconButton, Stack} from "@mui/joy";
import Typography from "@mui/joy/Typography";
// import { ApplicationContext } from "../../../App";

const Header = () => {
    const navigate = useNavigate();

    const toLiterature = () => {
        navigate("/literature");
    };

    const toProfile = () => {
        navigate("/home");
    };

    const toDictionary = () => {
        navigate("/dictionary");
    };

    const toTraining = () => {
        navigate("/pre-training");
    };

    return (
        <header className={classes.header}>
            <div className={classes.ContentWrapper}>

                    <div className={classes.Logotype} onClick={toProfile}>
                        <div className={classes.LogoLogo}></div>
                        <div className={classes.LogoText}>Linguisage</div>
                    </div>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{display: {xs: 'none', sm: 'flex'}}}
                    >
                        <Button
                            variant="plain"
                            color={window.location.pathname === "/literature" ? "primary" : "neutral"}
                            component="a"
                            size="md"
                            onClick={toLiterature}
                            sx={{alignSelf: 'center'}}
                            aria-pressed={window.location.pathname === "/literature"}
                        >
                            <Typography level={"title-lg"} color={"primary"}>
                                Literature
                            </Typography>
                        </Button>

                        <Button
                            variant="plain"
                            color={window.location.pathname === "/pre-training" ? "primary" : "neutral"}
                            component="a"
                            onClick={toTraining}
                            size="md"
                            aria-pressed={window.location.pathname === "/pre-training"}
                            sx={{alignSelf: 'center'}}
                        >
                            <Typography level={"title-lg"} color={"primary"}>
                                Training
                            </Typography>
                        </Button>
                        <Button
                            variant="plain"
                            color={window.location.pathname === "/dictionary" ? "primary" : "neutral"}
                            aria-pressed={window.location.pathname === "/dictionary"}
                            component="a"
                            onClick={toDictionary}
                            size="md"
                            sx={{alignSelf: 'center'}}
                        >
                            <Typography level={"title-lg"} color={"primary"}>
                                Dictionary
                            </Typography>
                        </Button>
                    </Stack>
                <Profile/>
            </div>
        </header>
    );
};
export default Header;
