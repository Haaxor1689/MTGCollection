import { Container, Grid } from "@material-ui/core";
import React from "react";
import AddDeck from "./Applets/AddDeck";
import DeckPreview from "./Applets/DeckPreview";
import CardSearch from "./Applets/CardSearchh";
import UserInfo from "./Applets/UserInfo";

const Home: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <UserInfo />
                <AddDeck />
                <CardSearch />
                <DeckPreview deckName="collection" />
            </Grid>
        </Container>
    );
};

export default Home;
