import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import React, {useState} from "react";
import {formState} from "./authWidget";
import {EmailErrorEnum, EmailErrorType, PasswordErrorType, UsernameErrorType} from "./types";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {validateEmail, validatePassword, validateUsername} from "./validations";
import AuthService from "../../../../../http/services/AuthService";
import {setUser} from "../../../../../store/user/userSlice";
import {AxiosError} from "axios";


interface YourComponentProps {
    setCurrentForm: React.Dispatch<React.SetStateAction<formState>>;
}

const SignUp: React.FC<YourComponentProps> = ({ setCurrentForm }) => {
    
    
    
    const [passwordError, setPasswordError] = useState<PasswordErrorType>(null)
    const [emailError, setEmailError] = useState<EmailErrorType>(null)
    const [usernameError, setUsernameError] = useState<UsernameErrorType>(null)
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isResponseWaiting, setIsResponseWaiting] = useState<boolean>(false)
    
    async function handleSignUp() {
        setIsResponseWaiting(true)
        setEmailError(validateEmail(email))
        setPasswordError(validatePassword(password))
        setUsernameError(validateUsername(username))
        
        if (validateEmail(email) || validatePassword(password) || validateUsername(username)) {
            setIsResponseWaiting(false)
            return
        }
        
        
        try {
            console.log("Создаём аккаунт...")
            const user = await AuthService.register(email, username, password)
            dispatch(setUser(user))
            localStorage.setItem("email", email)
            const loginResponse = await AuthService.login(email, password)
            localStorage.setItem("token", loginResponse.access_token)
            navigate("/confirm-email-request")
        // @ts-ignore
        } catch (error: AxiosError) {
            setIsResponseWaiting(false)
            if (error.response && error.response.status === 400) {
               if (error.response?.data?.detail === "REGISTER_USER_ALREADY_EXISTS") {
                   setEmailError(EmailErrorEnum.alreadyExists)
               } else if (error.response?.data?.detail === "UNSUPPORTED_EMAIL_ADDRESS") {
                   setEmailError(EmailErrorEnum.notSupport)
               }
            } else {
                console.error('Ошибка при входе в аккаунт:', error.message);
            }
        }
    }
    
    return (
        <>
            <div>
                <Typography level="h4" component="h1">
                    Sign Up
                </Typography>
                <Typography level="body-sm">Create a Linguisage account</Typography>
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
            
            <FormControl error={!!usernameError}>
                <FormLabel>Username</FormLabel>
                <Input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    // html input attribute
                    name="username"
                    placeholder="OlecaColeca"
                />
                <FormHelperText>
                    {usernameError}
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
            
            <Button type="submit" onClick={handleSignUp} loading={isResponseWaiting} loadingPosition="end">
                Sign Up
            </Button>
            <Typography
                endDecorator={<Link onClick={() => setCurrentForm("signIn")}>Sign In</Link>}
                fontSize="sm"
                sx={{alignSelf: 'center'}}
            >
                Already have an account?
            </Typography>
        </>
    );
};

export default SignUp;