import React, {useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import IUser from "../types/IUser.ts";
import AuthService from "../http/services/AuthService.ts";
import {setUser} from "../store/user/userSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        console.log("Ааутентификация...")
        const auth = async function () {
            try {
                const user: IUser = await AuthService.me()
                if (user.is_verified) {
                    dispatch(setUser(user))
                } else {
                    navigate("/confirm-email-request")
                }
            } catch (error) {
                console.log("Юзер не залогинен!")
                navigate("/")
            }


        }
        auth()
    }, []);

    return localStorage.getItem("token") ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;