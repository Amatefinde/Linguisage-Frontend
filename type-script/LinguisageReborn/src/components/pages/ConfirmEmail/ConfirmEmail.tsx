import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthService from "../../../http/services/AuthService";
import { setUser } from "../../../store/user/userSlice";
import classes from "./ConfirmEmail.module.css";

const ConfirmEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const [redirectTimer, setRedirectTimer] = useState(5); // Set initial timer value
    
    useEffect(() => {
        if (token) {
            console.log("Пытаемся подтвердить токен)");
            
            const countdown = setInterval(() => {
                setRedirectTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            
            AuthService.emailConfirm(token).then((user) => {
                setUser(user);
                
                // Clear the interval and navigate to "/profile" when the timer reaches 0
                clearInterval(countdown);
                navigate("/home");
            });
            
            // Clean up the interval when the component is unmounted
            return () => clearInterval(countdown);
        }
    }, [token, navigate]);
    
    const success = (
        <main className={classes.container}>
            <section className={classes.title}>Email confirmed successfully</section>
            <section className={classes.text}>
                You will be redirected to the Linguisage home page in {redirectTimer} seconds.
            </section>
        </main>
    );
    
    return success;
};

export default ConfirmEmail;
