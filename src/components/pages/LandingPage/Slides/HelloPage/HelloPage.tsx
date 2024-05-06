import classes from "./HelloPage.module.css"

const HelloPage = () => {
        return (
            <section className={classes.wrapper}>
                <svg width="215" height="215" viewBox="0 0 215 215" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="214.711" height="214.711" rx="107.356" fill="#5280DB"/>
                </svg>

                <div className={classes.text}>
                    Linguisage
                </div>
            </section>
        );
    }
;

export default HelloPage;