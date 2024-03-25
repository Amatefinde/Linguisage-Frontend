import classes from "./UserMainPage.module.css"
import LastBook from "./LastBook/LastBook";
import UploadBooks from "./UploadBooks/UploadBooks";
import TrainCard from "./TrainCard/TrainCard";
import WordCards from "./WordCards/WordCards.tsx";
import LoaderForPage from "../../ui/LoaderForPage/LoaderForPage.tsx";
import {useState} from "react";


const UserMainPage = () => {
    const [isLastBookLoading, setIsLastBookLoading] = useState<boolean>(true)
    const [isWordCardsLoading, setIsWordCardsLoading] = useState<boolean>(true)

    const content = <div
        className={[
            classes.parent,
            isLastBookLoading || isWordCardsLoading ? null : classes.smoothAppear,
        ].join(" ")}
    >
        <div className={classes.screen}>
            <LastBook setIsLastBookLoading={setIsLastBookLoading}/>
            <section className={classes.Container}>
                <div className={classes.UploadBooks}>
                    <UploadBooks/>
                </div>
                <div className={classes.StartTrain}>
                    <TrainCard/>
                </div>
                <WordCards setIsWordCardsLoading={setIsWordCardsLoading}/>
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
            {(isLastBookLoading || isWordCardsLoading) &&
                    <LoaderForPage/>
            }
            {content}
        </>
    )
};

export default UserMainPage;
