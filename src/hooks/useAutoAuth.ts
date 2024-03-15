import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import IUser from "../types/IUser.ts";
import AuthService from "../http/services/AuthService";
import {setUser} from "../store/user/userSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";


export default function() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const auth = async function () {
            try {
                const user: IUser = await AuthService.me()
                if (user.is_verified) {
                    dispatch(setUser(user))
                    navigate("/home")
                } else {
                    navigate("/confirm-email-request")
                }
            } catch (error) {
            }


        }
        auth()
    }, []);
    
    
}