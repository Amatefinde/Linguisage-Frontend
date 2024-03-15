
import classes from "./UserMainPage.module.css"
import LastBook from "./LastBook/LastBook";
import UploadBooks from "./UploadBooks/UploadBooks";
import TrainCard from "./TrainCard/TrainCard";
import AddWordBlock from "./AddWordBlock/AddWordBlock.tsx";
import Button from "@mui/joy/Button";
import useAutoAuth from "../../../hooks/useAutoAuth";


const UserMainPage = () => {

    useAutoAuth()

    const content = <div
        className={[
            classes.parent,
            classes.smoothAppear,
        ].join(" ")}
    >
        <div className={classes.screen}>

            <LastBook/>

            <section className={classes.Container}>
                <div className={classes.UploadBooks}>
                    <UploadBooks/>
                </div>
                <div className={classes.StartTrain}>
                    <TrainCard/>
                </div>
                {/*{problemWords.map(e => <WordCard key={e.id} sense={e}/>)}*/}
                <AddWordBlock/>
            </section>
            <div className={classes.otherContent}>
                {/*<MotivationBlock>*/}
                {/*    Павел Воля выучил английский, когда ему было пять, а тебе сто..*/}
                {/*</MotivationBlock>*/}
                {/*<div className={classes.brandMark}>designed by ??????</div>*/}
            </div>
        </div>
    </div>
    
    
    return (
        <>
            {content}

        </>
    )
};

export default UserMainPage;
