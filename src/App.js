import Header from "./components/Blocks/Header/Header";
import Home from "./components/Pages/UserMainPage/Home";
import HelloPage from "./components/Pages/AuthenticationPage/HelloPage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import AuthService from "./services/AuthService";
import PdfViewer from "./components/PdfViewer";

export const AuthContext = createContext(null);

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthService.me()
      .then(() => {
        setIsLogged(true);
      })
      .catch(() => setIsLogged(false))
      .finally(() => setIsLoading(false));
  }, []);

  const app = (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HelloPage />} />
            <Route path="/profile" element={<Home />} />
            <Route path="/test" element={<PdfViewer />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );

  return isLoading || app;
}

export default App;
