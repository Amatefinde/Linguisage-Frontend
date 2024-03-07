import React, {useState} from "react";
import "./main.css";
import UserMainPage from "./components/pages/UserMainPage/UserMainPage";
import useAutoAuth from "./hooks/useAutoAuth";
import { useRef } from "react";
import ePub from 'epubjs';

const App = () => {
    useAutoAuth();
    // const [imgUrl, setImgUrl] = useState<string|null>(null)
    // const inputRef = useRef(null);
    // const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //
    //     if (file) {
    //         try {
    //             const book = ePub(file);
    //             const cover = await book.coverUrl()
    //             setImgUrl(cover);
    //         } catch (error) {
    //             console.error('Error loading EPUB file:', error);
    //             // Handle the error appropriately
    //         }
    //     }
    // };
    
    return (
        <div>
            <UserMainPage/>
        </div>
    );
};

export default App;
