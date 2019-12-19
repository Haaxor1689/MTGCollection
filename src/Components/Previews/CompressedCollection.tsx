import { Grid } from "@material-ui/core";
import React from "react";
import { CollectionPreviewProps } from "./CollectionPreview";
import CompressedCard from "./CompressedCard";
import IndentedTypography from "../Styled/IndentedTypography";

const CompressedCollecion: React.FC<CollectionPreviewProps> = ({ cards, sortBy, sortOrder, showGroups, ...props }) => {
    return (
        <Grid container direction="column">
            {cards.length >= 1 ? (
                cards.map(c => (
                    <Grid item key={c.name} xs zeroMinWidth>
                        <CompressedCard card={c} {...props} />
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <IndentedTypography color="textSecondary" variant="subtitle2">Empty</IndentedTypography>
                </Grid>
            )}
        </Grid>
    );
};
export default CompressedCollecion;
