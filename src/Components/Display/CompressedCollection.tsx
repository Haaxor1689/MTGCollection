import { Grid } from "@material-ui/core";
import React from "react";
import { CollectionPreviewProps } from "./CollectionPreview";
import CompressedCard from "./CompressedCard";

const CompressedCollecion: React.FC<CollectionPreviewProps> = ({ cards, sortBy, sortOrder, showGroups, ...props }) => {
    return (
        <Grid container direction="column">
            {cards.map(c => (
                <Grid item key={c.name} xs zeroMinWidth>
                    <CompressedCard card={c} {...props} />
                </Grid>
            ))}
        </Grid>
    );
};
export default CompressedCollecion;
