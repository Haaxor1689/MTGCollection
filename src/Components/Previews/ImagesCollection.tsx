import { Grid } from "@material-ui/core";
import React from "react";
import IndentedTypography from "../Styled/IndentedTypography";
import { CollectionPreviewProps } from "./CollectionPreview";
import ImagesCard from "./ImagesCard";

const ImagesCollecion: React.FC<CollectionPreviewProps> = ({ cards, sortBy, sortOrder, showGroups, ...props }) => {
    return (
        <Grid container spacing={1} alignItems="center">
            {cards.length >= 1 ? (
                cards.map(c => (
                    <Grid key={c.name} item xs={12} sm={6} lg={4} xl={3}>
                        <ImagesCard card={c} {...props} />
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <IndentedTypography color="textSecondary">Empty</IndentedTypography>
                </Grid>
            )}
        </Grid>
    );
};
export default ImagesCollecion;
