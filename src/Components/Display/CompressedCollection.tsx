import { Grid } from "@material-ui/core";
import React from "react";
import { CollectionPreviewProps } from "./CollectionPreview";
import CompressedCard from "./CompressedCard";

const CompressedCollecion: React.FC<CollectionPreviewProps> = ({ cards, actions, deckName, sectionName }) => {
    return (
        <Grid container direction="column">
            {cards.map(c => (
                <Grid item key={c.name} xs zeroMinWidth>
                    <CompressedCard card={c} actions={actions} deckName={deckName} sectionName={sectionName} />
                </Grid>
            ))}
        </Grid>
    );
};
export default CompressedCollecion;
