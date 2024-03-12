import "./main.css";
import UserMainPage from "./components/pages/UserMainPage/UserMainPage";
import useAutoAuth from "./hooks/useAutoAuth";
import Header from "./components/blocks/Header/Header.tsx";

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
            <Header/>
            <UserMainPage/>
        </div>
    );
};

export default App;
