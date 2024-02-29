import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import User from "../../../types/User";
import classes from "./ConfirmEmail.module.css"
import useAutoAuth from "../../../hooks/useAutoAuth";

const ConfirmEmail = () => {
    useAutoAuth()
    
    const user: User = useSelector((state: RootState) => state.user.userData)
    
    return (
        <div className={classes.container}>
            <div>
                We have sent an email to <span className={classes.userEmail}>{user?.email}</span>.
                Please follow the link in the email to confirm your account.
                If you haven't received the email, please check your spam folder.
            </div>
        </div>
    );
};

export default ConfirmEmail;