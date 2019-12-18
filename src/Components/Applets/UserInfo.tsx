import { Grid } from "@material-ui/core";
import React from "react";
import { AppletPaper, Title } from "../Styled/Grid";

const UserInfo: React.FC = () => {
    return (
        <Grid item xs={12} sm md>
            <AppletPaper>
                <Title>User info</Title>
                UserInfo paceholder.
            </AppletPaper>
        </Grid>
    );
};

export default UserInfo;
