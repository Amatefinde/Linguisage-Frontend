import Header from "../../blocks/Header/Header.tsx";
import {useParams} from "react-router-dom";


const UserMainPage = () => {
    // const [lastOpenedBook, setLastOpenedBook] = useState(
    //     last_opened_book_template,
    // );
    // const {isLogged, setIsLogged} = useContext(ApplicationContext);
    // const [isLastBookLoaded, setIsLastBookLoaded] = useState(false);
    // const [problemWords, setProblemWords] = useState([])
    // const [isProblemWordsLoaded, setIsProblemWordsLoaded] = useState(false)
    //
    // useEffect(() => {
    //     BookService.get_last_book()
    //         .then((e) => {
    //             if (e !== null) {
    //                 setLastOpenedBook({
    //                     ...lastOpenedBook,
    //                     title: e.literature.title,
    //                     id: e.literature.id,
    //                     bookCover: e.literature.cover.replace("\\", "/").replace("\\", "/"),
    //                     wordLearned: e.stats.complete,
    //                     wordTotal: e.stats.total,
    //                     wordInProcess: e.stats.in_process,
    //                     wordInQueue: e.stats.in_queue,
    //
    //                 });
    //             }
    //         })
    //         .catch((e) => {
    //             console.log("Ошибка:", e);
    //         })
    //         .finally(e => {
    //             setIsLastBookLoaded(true)
    //         });
    // }, []);
    //
    //
    // useEffect(() => {
    //     TrainService.getTrain(4)
    //         .then(e => {
    //             setProblemWords([...e, ...words].slice(0, 4))
    //         })
    //         .catch(e => {
    //             console.log("Ошибка:", e);
    //             setProblemWords(words)
    //         })
    //         .finally(e => {
    //             setIsProblemWordsLoaded(true)
    //         })
    // }, []);
    //
    // const content = <div
    //     className={[
    //         classes.parent,
    //         classes.smoothAppear,
    //     ].join(" ")}
    // >
    //     <div className={classes.screen}>
    //         {!!lastOpenedBook.title && (
    //             <LastBook
    //                 book={lastOpenedBook}
    //                 isLastBookLoaded={isLastBookLoaded}
    //                 setIsLastBookLoaded={setIsLastBookLoaded}
    //             />
    //         )}
    //         <section className={classes.Container}>
    //             <div className={classes.UploadBooks}>
    //                 <UploadBooks/>
    //             </div>
    //             <div className={classes.StartTrain}>
    //                 <TrainCard/>
    //             </div>
    //             {problemWords.map(e => <WordCard key={e.id} sense={e}/>)}
    //         </section>
    //         <div className={classes.otherContent}>
    //             <MotivationBlock>
    //                 Павел Воля выучил английский, когда ему было пять, а тебе сто..
    //             </MotivationBlock>
    //             <div className={classes.brandMark}>designed by ??????</div>
    //         </div>
    //     </div>
    // </div>
    

    return <Header/>
};

export default UserMainPage;
