import { Avatar, Chip, Grid } from "@material-ui/core";
import React from "react";
import { AppletPaper, Title } from "../Styled/Grid";

const UserInfo: React.FC = () => {
    return (
        <Grid item xs={12} sm md>
            <AppletPaper>
                <Title>User info</Title>
                UserInfo paceholder
                <Chip avatar={<Avatar onClick={() => console.log("Clicked avatar")}>Avatar</Avatar>} label="Chip title" onClick={() => console.log("Clicked chip")} />
            </AppletPaper>
        </Grid>
    );
};

export default UserInfo;
