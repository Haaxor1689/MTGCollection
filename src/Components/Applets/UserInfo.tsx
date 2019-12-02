import React from "react";
import { Grid } from "@material-ui/core";
import { AppletPaper } from "../Styled/Grid";

const UserInfo: React.FC = () => {
    return (
        <Grid item xs={12} md={9}>
            <AppletPaper>
                UserInfo paceholder
            </AppletPaper>
        </Grid>
    )
}

export default UserInfo;