import { Grid } from "@material-ui/core";
import React from "react";
import { CollectionPreviewProps } from "./CollectionPreview";
import ImagesCard from "./ImagesCard";

const ImagesCollecion: React.FC<CollectionPreviewProps> = ({ cards, sortBy, sortOrder, showGroups, ...props }) => {
    return (
        <Grid container spacing={1}>
            {cards.map(c => (
                <Grid key={c.name} item xs={6} lg={6} xl={4}>
                    <ImagesCard card={c} {...props} />
                </Grid>
            ))}
        </Grid>
    );
};
export default ImagesCollecion;
