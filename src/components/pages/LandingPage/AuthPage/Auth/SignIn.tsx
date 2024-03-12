import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import React, {useState} from "react";
import {formState} from "./authWidget";
import {validateEmail, validatePassword} from "./validations";
import {AxiosError} from "axios";
import {useDispatch} from "react-redux";
import {setUser} from "../../../../../store/user/userSlice";
import AuthService from "../../../../../http/services/AuthService";
import {useNavigate} from "react-router-dom";
import {EmailErrorType, PasswordErrorType, PasswordErrorEnum} from "./types";
import UserInterface from "../../../../../types/UserInterface";

interface YourComponentProps {
    setCurrentForm: React.Dispatch<React.SetStateAction<formState>>;
}

const SignIn: React.FC<YourComponentProps> = ({ setCurrentForm }) => {
    
    const [passwordError, setPasswordError] = useState<PasswordErrorType>(null)
    const [emailError, setEmailError] = useState<EmailErrorType>(null)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    async function handleSignIn() {
        setEmailError(validateEmail(email))
        setPasswordError(validatePassword(password))
        
        
        if (validateEmail(email) || validatePassword(password)) {
            return
        }
        
        try {
            console.log("Логинимся на сервер...")
            const loginResponse = await AuthService.login(email, password)
            localStorage.setItem("token", loginResponse.access_token)
            localStorage.setItem("email", email)
            const user: UserInterface = await AuthService.me()
            console.log(user)
            dispatch(setUser(user))
            if (user.is_verified) {
                navigate("/home")
            } else {
                navigate("/confirm-email-request")
            }
            
        // @ts-ignore
        } catch (error: AxiosError) {
                if (error.response && error.response.status === 400) {
                    setPasswordError(PasswordErrorEnum.invalidCredentials)
                    setPassword("")
                } else {
                    console.error('Ошибка при входе в аккаунт:', error.message);
                }
        }
    }

    return (
        <>
            <div>
                <Typography level="h4" component="h1">
                    Log In
                </Typography>
                <Typography level="body-sm">Sign in to continue.</Typography>
            </div>

            <FormControl error={!!emailError}>
                <FormLabel>Email</FormLabel>
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    // html input attribute
                    name="email"
                    type="email"
                    placeholder="superpro@example.com"
                />
                <FormHelperText>
                    {emailError}
                </FormHelperText>
                
            </FormControl>
            <FormControl error={!!passwordError}>
                <FormLabel>
                    Password
                </FormLabel>
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                    type="password"
                    placeholder="qwerty123"
                />
                <FormHelperText>
                    {passwordError}
                </FormHelperText>
            </FormControl>

            <Button type="submit" onClick={handleSignIn}>
                Log In
            </Button>
            <Typography
                endDecorator={<Link onClick={() => setCurrentForm("signUp")}>Sign up</Link>}
                fontSize="sm"
                sx={{alignSelf: 'center'}}
            >
                Don't have an account?
            </Typography>
        </>
    );
};




export default SignIn;