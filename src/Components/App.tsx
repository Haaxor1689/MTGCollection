import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import GoogleApi from "../Utility/GoogleApi";
import Home from "./Home";
import SignIn from "./SignIn";

const App: React.FC = () => {
    const [signedIn, setSignedIn] = React.useState(false);

    /**
     * Called at app init, sets Google API signin callback
     * info stored in React profile state
     */
    React.useEffect(() => {
        GoogleApi.initClient(async (isSignedIn: boolean) => {
            setSignedIn(isSignedIn);
        });
    }, []);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Redirect to={signedIn ? "/" : "/signin/"} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin/" component={SignIn} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
