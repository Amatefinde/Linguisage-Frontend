import Sheet from '@mui/joy/Sheet';
import SignIn from "./SignIn.tsx";
import {useState} from "react";
import SignUp from "./SignUp.tsx";

export type formState = "signIn" | "signUp" | "restore";


export default function LoginWidget() {
    const [currentForm, setCurrentForm] = useState<formState>("signIn")

    const forms = {
        signIn: <SignIn setCurrentForm={setCurrentForm}/>,
        signUp: <SignUp setCurrentForm={setCurrentForm}/>,
        restore: null,
    }

    return (
        <Sheet sx={{
            width: 350,
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            background: "#ffffff",
            gap: 2,
            borderRadius: 20,
            padding: 5,

            border: "None",
            boxShadow: 'md',
        }}>
            {forms[currentForm]}
        </Sheet>
    );
}