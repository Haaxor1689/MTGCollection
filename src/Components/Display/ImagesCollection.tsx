import React from "react";
import ScrySdk from "scryfall-sdk";
import { DeckCard } from "../../State";
import ImagesCard from "./ImagesCard";
import { Grid } from "@material-ui/core";

type Props = {
    cards: (DeckCard & ScrySdk.Card)[];
};

const ImagesCollecion: React.FC<Props> = ({ cards }) => {
    return (
        <Grid container spacing={1}>
            {cards.map(c => (
                <Grid key={c.name} item xs={6} lg={6} xl={4}>
                    <ImagesCard card={c} />
                </Grid>
            ))}
        </Grid>
    );
};
export default ImagesCollecion;
