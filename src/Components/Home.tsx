import { Container, Grid } from "@material-ui/core";
import React from "react";
import AddDeck from "./Applets/AddDeck";
import DeckPreview from "./Applets/DeckPreview";
import CardSearch from "./Applets/CardSearch";
import UserInfo from "./Applets/UserInfo";
import { State } from "../State";

const Home: React.FC = () => {
    const [state] = React.useContext(State);
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <UserInfo />
                <AddDeck />
                <CardSearch />
                { state.selectedDeck !== null && <DeckPreview deckName={state.selectedDeck} />}
            </Grid>
        </Container>
    );
};

export default Home;
