import React, {useState} from 'react';
import classes from "./MotivationBlock.module.css"
import BaitStars from "./static/BaitStars.png"
import frameStar from "./static/frameStar.png"
import "../../../../fontStyles.css"

const MotivationBlock = ({children}) => {
    const [isMotivationHide, setIsMotivationHide] = useState(true)


    return (
        <div
            className={classes.island}
            onClick={
                () => setIsMotivationHide(false)
            }
        >
                {
                    isMotivationHide ?
                        <img src={BaitStars} alt={"here must be some bait to click here"} className={classes.baitStars}/> :
                        (<div className={classes.motivation}>
                            <img src={frameStar} alt={"here must be beautiful star"} className={classes.frameStar}/>
                            <div><span className="mainFont">{children}</span></div>
                            <img src={frameStar} alt={"here must be beautiful star"} className={classes.frameStar}/>
                        </div>)
                }

        </div>
    );
};

export default MotivationBlock;