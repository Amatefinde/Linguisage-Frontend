import React from 'react';
import classes from "./ProgressCircle.module.css";



const ProgressCircle = ({green, yellow, total}) => {
    const calculateMetric = metric => (507 - (507 * metric))
    const yellowMetric = calculateMetric((green + yellow) / total)
    const greenMetric = calculateMetric(green / total)


    return (
        <section>
            <div className={classes.progressBox}>
                <svg>
                    <circle style={{strokeDashoffset: 0, stroke: "#DFDFDF", strokeWidth: "19.3px"}} r="81" cx="81" cy="81"></circle>
                    <circle style={{strokeDashoffset: yellowMetric, stroke: "#FBC63F", strokeWidth: "19.6px"}} r="81" cx="81" cy="81"></circle>
                    <circle style={{strokeDashoffset: greenMetric, stroke: "#92CE7D"}} r="81" cx="81" cy="81"></circle>
                </svg>
                <div className={classes.number}>
                    <div className={classes.big}>
                        {total}
                    </div>
                    <div className={classes.little}>words</div>
                </div>
            </div>
        </section>
    );
};

export default ProgressCircle;