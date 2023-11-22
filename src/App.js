import Home from "./components/Pages/UserMainPage/Home";
import HelloPage from "./components/Pages/AuthenticationPage/HelloPage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import AuthService from "./services/AuthService";
import PdfViewer from "./components/PdfViewer";
import LiteraturePage from "./components/Pages/LiteraturePage/LiteraturePage";
import Book from "./components/Blocks/Book/Book";
import TrainingPage from "./components/Pages/DictionaryPage/TrainingPage";
import DictionaryPage from "./components/Pages/TrainingPage/DictionaryPage";
import ReaderPage from "./components/Pages/PDFReaderPage/ReaderPage";

export const ApplicationContext = createContext(null);

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
            <Route path="/test" element={<Book />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApplicationContext.Provider>
  );

  return isLoading || app;
}

export default App;
