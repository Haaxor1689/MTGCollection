import { Grid } from "@material-ui/core";
import React from "react";
import { DeckName, State } from "../../State";
import { AppletContent, Title } from "../Styled/Grid";
import DeckBox from "./DeckBox";

const DeckList: React.FC = () => {
    const [state] = React.useContext(State);
    return (
        <AppletContent>
            <Title>Your decks</Title>
            <Grid container spacing={6} direction="column">
                <Grid item container spacing={1}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <DeckBox deck={state.decks[DeckName.Collection]} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <DeckBox deck={state.decks[DeckName.Wishlist]} />
                    </Grid>
                </Grid>
                <Grid item container spacing={1}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <DeckBox />
                    </Grid>
                    {Object.values(state.decks)
                        .filter(deck => deck.name !== DeckName.Collection && deck.name !== DeckName.Wishlist)
                        .map(deck => (
                            <Grid key={deck.name} item xs={12} sm={6} lg={3}>
                                <DeckBox deck={deck} />
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        </AppletContent>
    );
};

export default DeckList;
