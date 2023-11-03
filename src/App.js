import Header from "./components/Blocks/Header/Header";
import Home from "./components/Pages/UserMainPage/Home";
import HelloPage from "./components/Pages/AuthenticationPage/HelloPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createContext, useState} from "react";




function App() {
    return (
        <div className="App" style={{position: "sticky", top: "0"}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HelloPage/>}/>
                    <Route path="/profile" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
