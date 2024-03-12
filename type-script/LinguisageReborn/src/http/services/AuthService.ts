import $api from "../index.js";
import UserInterface from "../../types/UserInterface.ts";


interface LoginResponse {
    access_token: "icOGhsqHi-7pklxHTatP4VvDwcrzi68oiBHUQPXMtT0",
    token_type: "bearer"
}


export default class AuthService {
    static async login(email: string, password: string): Promise<LoginResponse> {
        const loginForm = new FormData();
        loginForm.append("username", email);
        loginForm.append("password", password);
        return $api.post("auth/login", loginForm).then((response) => response.data);
    }
    
    
    static async register(email: string, username: string, password: string): Promise<UserInterface> {
        return $api
            .post("auth/register", {email, password, username})
            .then((response) => response.data);
    }
    
    static async logout(): Promise<void> {
        return $api.post("auth/logout").then((response) => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            return response.data;
        });
    }
    
    static async me(): Promise<UserInterface> {
        return $api.get("auth/me").then((response) => response.data);
    }
    
    
    static async requestEmailConfirm(email: string): Promise<void> {
        return $api.post("auth/request-verify-token", {email,}).then((response) => {
            return response.data;
        })
    }
    static async emailConfirm(token: string): Promise<UserInterface> {
        return $api.post("auth/verify", {token,}).then(response => {
            return response.data
        })
    }
}