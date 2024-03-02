import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import User from "../types/User";
import AuthService from "../http/services/AuthService";
import {setUser} from "../store/user/userSlice";

export default function() {
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            try {
                const user: User = await AuthService.me()
                if (user.is_verified) {
                    setUser(user)
                    navigate("/application")
                } else {
                    navigate("/confirm-email-request")
                }
            } catch (error) {
            }
            
            
        })();
    }, []);
    
    
}