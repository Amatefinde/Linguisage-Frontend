import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token === null) {
            navigate("/")
        } else {
            navigate("/application")
        }
    }, []);
    
    
}