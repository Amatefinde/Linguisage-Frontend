import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./main.css"
import {Provider} from "react-redux";
import {store} from "./store";
import {CssVarsProvider} from "@mui/joy/styles";
import theme from "./config/theme";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import App from "./App";
import ConfirmEmailRequest from "./components/pages/RequestConfirmEmail/RequestConfirmEmail";
import ConfirmEmail from "./components/pages/ConfirmEmail/ConfirmEmail";
import AddWord from "./components/blocks/AddWord/AddWord";
import DictionaryPage from "./components/pages/DictionaryPage/DictionaryPage.tsx";
import VerticalTrainWordCard from "./components/blocks/TrainWordCard/VerticalTrainWordCard/VerticalTrainWordCard.tsx";
import TrainPage from "./components/pages/TrainPage/TrainPage.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>,
        errorElement: <h1>Not found 404</h1>
    },
    {
        path: "/home",
        element: <App/>,
    },
    {
        path: "/confirm-email-request",
        element: <ConfirmEmailRequest/>,
    },
    {
        path: "/auth",
        element: <ConfirmEmail/>
    },
    {
        path: "/dictionary",
        element: <DictionaryPage/>
    },
    {
        path: "/quick-training",
        element: <TrainPage/>
    }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <CssVarsProvider theme={theme} defaultMode={'light'}>
                <RouterProvider router={router}/>
            </CssVarsProvider>
        </Provider>
    </React.StrictMode>,
)
