import Header from "../../blocks/Header/Header";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import User from "../../../types/User";
import AuthService from "../../../http/services/AuthService.ts";


const UserMainPage = () => {
    const [user, setUser] = useState<User>(null)
    
    useEffect(() => {
        AuthService.me().then(fetchedUser => setUser(fetchedUser))
    }, []);
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
    
    
    return (
        <>
            <Header/>
            {user && (user.email)}
        </>
    )
};

export default UserMainPage;
