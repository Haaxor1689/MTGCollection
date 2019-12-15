import { Grid } from "@material-ui/core";
import React from "react";
import { AppletPaper, Title } from "../Styled/Grid";

const CardSearch: React.FC = () => {
    return (
        <Grid item xs={12} md>
            <AppletPaper>
                <Title>Card search</Title>
            </AppletPaper>
        </Grid>
    );
};

export default CardSearch;
