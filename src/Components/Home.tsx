import { Grid } from "@material-ui/core";
import React from "react";
import CardSearch from "./Applets/CardSearch";
import DeckList from "./Applets/DeckList";

const Home: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <CardSearch />
            </Grid>
            <Grid item xs={12}>
                <DeckList />
            </Grid>
        </Grid>
    );
};
export default Home;
