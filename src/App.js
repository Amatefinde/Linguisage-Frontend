import Home from "./components/Pages/UserMainPage/Home";
import HelloPage from "./components/Pages/AuthenticationPage/HelloPage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import AuthService from "./services/AuthService";
import LiteraturePage from "./components/Pages/LiteraturePage/LiteraturePage";
import DictionaryPage from "./components/Pages/DictionaryPage/DictionaryPage";
import ReaderPage from "./components/Pages/PDFReaderPage/ReaderPage";
import SandboxPage from "./components/Pages/SandboxPage/SandboxPage";
import TrainingPage from "./components/Pages/TrainingPage/TrainingPage";

export const ApplicationContext = createContext(null);

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWord, setCurrentWord] = useState([]);
  const [currentBookAllPages, setCurrentBookAllPages] = useState([]);

  useEffect(() => {
    AuthService.me()
      .then(() => {
        setIsLogged(true);
      })
      .catch(() => setIsLogged(false))
      .finally(() => setIsLoading(false));
  }, []);

  const app = (
    <ApplicationContext.Provider
      value={{
        isLogged,
        setIsLogged,
        currentBookAllPages,
        setCurrentBookAllPages,
        currentWord,
        setCurrentWord,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HelloPage />} />
            <Route path="/profile" element={<Home />} />
            <Route path="/literature" element={<LiteraturePage />} />
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/reader" element={<ReaderPage />} />
            <Route path="/test" element={<SandboxPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApplicationContext.Provider>
  );

  return isLoading || app;
}

export default App;
