import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import User from "../../../types/User";
import classes from "./ConfirmEmail.module.css"
import useAutoAuth from "../../../hooks/useAutoAuth";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import AuthService from "../../../http/services/AuthService";
import {useNavigate} from "react-router-dom";
import EmailResend from "../../blocks/EmailResend/EmailResend";

const ConfirmEmail = () => {
    useAutoAuth()
    
    
    async function resendEmail() {
        const email = localStorage.getItem("email")
        if (email){
            await AuthService.requestEmailConfirm(email)
        }
    }
    
    const user: User = useSelector((state: RootState) => state.user.userData)
    const navigate = useNavigate()
    return (
        <div className={classes.container}>
            <header className={classes.title}>Confirm your email</header>
            <section className={classes.text}>
                We have sent an email to <span className={classes.userEmail}>{localStorage.getItem("email")}</span>.<br/>
                Please follow the link in the email to confirm your account.<br/>
                If you haven't received the email, please check your spam folder.
            </section>
            <section className={classes.buttons}>
                <ButtonGroup variant={"soft"} size="lg" spacing={4} aria-label="soft button group">
                    <Button sx={{width: "305px"}} onClick={() => AuthService.logout().finally(() => navigate("/"))}>Use another email</Button>
                    <EmailResend sx={{width: "305px"}} sendEmail={resendEmail}/>
                </ButtonGroup>
            </section>
        </div>
    );
};

export default ConfirmEmail;