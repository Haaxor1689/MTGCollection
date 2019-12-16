import { Grid } from "@material-ui/core";
import React from "react";
import { CollectionPreviewProps } from "./CollectionPreview";
import ImagesCard from "./ImagesCard";

const ImagesCollecion: React.FC<CollectionPreviewProps> = ({ cards, actions, deckName, sectionName }) => {
    return (
        <Grid container spacing={1}>
            {cards.map(c => (
                <Grid key={c.name} item xs={6} lg={6} xl={4}>
                    <ImagesCard card={c} actions={actions} deckName={deckName} sectionName={sectionName} />
                </Grid>
            ))}
        </Grid>
    );
};
export default ImagesCollecion;
