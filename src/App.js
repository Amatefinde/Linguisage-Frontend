import Header from "./components/blocks/Header/Header";
import Home from "./components/blocks/UserMainPage/Home";
import HelloPage from "./components/blocks/HelloPage/HelloPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    return (
        <div className="App">
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
