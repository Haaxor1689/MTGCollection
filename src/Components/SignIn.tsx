import { Grid } from "@material-ui/core";
import React from "react";
import logo from "../Assets/logo.png";
import GoogleApi from "../Utility/GoogleApi";
import SignInButton from "./SignInButton";

const SignIn: React.FC = () => {
    return (
        <>
            <Grid container justify="center" alignItems="center" style={{ padding: 25 }}>
                <img src={logo} alt="" width="150px" height="150px" draggable={false} />
            </Grid>
            <Grid container justify="center" alignItems="center">
                <SignInButton variant="contained" onClick={GoogleApi.signIn} />
            </Grid>
        </>
    );
};

export default SignIn;
