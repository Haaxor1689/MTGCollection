import { Grid } from "@material-ui/core";
import React from "react";
import GoogleApi from "../../Utility/GoogleApi";
import Logo from "../../Assets/logo.png";
import SignInButton from "../SignInButton";
import { AppletContent } from "../Styled/Grid";

const SignIn: React.FC = () => {
    return (
        <AppletContent>
            <Grid container justify="center" alignItems="center" style={{ padding: 25 }}>
                <img src={Logo} alt="" width="150px" height="150px" draggable={false} />
            </Grid>
            <Grid container justify="center" alignItems="center">
                <SignInButton variant="contained" onClick={GoogleApi.signIn} />
            </Grid>
        </AppletContent>
    );
};

export default SignIn;
