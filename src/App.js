import Header from "./components/Blocks/Header/Header";
import Home from "./components/Pages/UserMainPage/Home";
import HelloPage from "./components/Pages/AuthenticationPage/HelloPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createContext, useState} from "react";

export const AuthContext = createContext(null)


function App() {

    const [isLogged, setIsLogged] = useState(false)

    return (
        <AuthContext.Provider value={{isLogged, setIsLogged}}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HelloPage/>}/>
                        <Route path="/profile" element={<Home/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
