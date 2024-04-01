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
import PrivateRoute from "./components/PrivateRoute.tsx";
import PreTrainPage from "./components/pages/PreTrainPage/PreTrainPage.tsx";
import LiteraturePage from "./components/pages/LiteraturePage/LiteraturePage.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>,
        errorElement: <h1>Not found 404</h1>
    },
    {
        path: "/home",
        element: <PrivateRoute ><App/></PrivateRoute>,
    },
    {
        path: "/confirm-email-request",
        element: <PrivateRoute ><ConfirmEmailRequest/></PrivateRoute>,
    },
    {
        path: "/auth",
        element: <PrivateRoute ><ConfirmEmail/></PrivateRoute>
    },
    {
        path: "/literature",
        element: <PrivateRoute ><LiteraturePage/></PrivateRoute>
    },
    {
        path: "/dictionary",
        element: <PrivateRoute ><DictionaryPage/></PrivateRoute>
    },
    {
        path: "/training",
        element: <PrivateRoute ><TrainPage/></PrivateRoute>
    },
    {
        path: "/pre-training",
        element: <PrivateRoute ><PreTrainPage/></PrivateRoute>
    }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
        <Provider store={store}>
            <CssVarsProvider theme={theme} defaultMode={'light'}>
                <RouterProvider router={router}/>
            </CssVarsProvider>
        </Provider>
)
