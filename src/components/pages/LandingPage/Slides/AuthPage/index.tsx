import classes from "./index.module.css"
import LogInWidget from "./Auth/authWidget.tsx";
import TagLine from "./TagLine/TagLine.tsx";

const Index = () => {
    return (
        <main className={classes.background}>
            <div className={classes.centerWrapper} id="auth-container">
                <TagLine/>
                <LogInWidget/>
            </div>
        </main>
    );
};

export default Index;