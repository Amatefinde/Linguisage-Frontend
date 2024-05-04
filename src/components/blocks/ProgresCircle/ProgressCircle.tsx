import React from 'react';
import classes from "./ProgressCircle.module.css";

interface ProgressCircleProps {
    success: number;
    in_process: number;
    total: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ success, in_process, total }) => {
    const calculateMetric = (metric_coef: number) => 507 - (507 * metric_coef);
    const yellowMetric = total !== 0 ? calculateMetric((success + in_process) / total) : 0;
    const greenMetric = total !== 0 ? calculateMetric(success / total) : 0;

    return (
        <section>
            <div className={classes.progressBox}>
                <svg>
                    <circle style={{ strokeDashoffset: 0, stroke: "#DFDFDF", strokeWidth: "19.3px" }} r="81" cx="81" cy="81"></circle>
                    {in_process !== 0 && <circle style={{ strokeDashoffset: yellowMetric, stroke: "#FBC63F", strokeWidth: "19.6px" }} r="81" cx="81" cy="81"></circle>}
                    {success !== 0 && <circle style={{ strokeDashoffset: greenMetric, stroke: "#92CE7D" }} r="81" cx="81" cy="81"></circle>}
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
