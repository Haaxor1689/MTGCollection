import React from "react";
import GoogleApi from "../Utility/GoogleApi";
import SignInButton from "./SignInButton";
import { Grid } from "@material-ui/core";

const SignIn: React.FC = () => {
    return (
        <Grid container justify="center" alignItems="center">
            <SignInButton variant="contained" onClick={GoogleApi.signIn} />
        </Grid>
    );
};

export default SignIn;
