import { Button, ButtonGroup, Grid, Tooltip, Typography } from "@material-ui/core";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React from "react";
import { DeckCard } from "../../State";
import { FlexCol } from "../Styled/Grid";
import styled from "../Styled/Theme";
import ScrySdk from "scryfall-sdk";
import ListCollecion from "./ListCollection";

export type PreviewStyle = "Standard" | "List" | "Images";

const IconForStyle = (style: PreviewStyle) => {
    switch (style) {
        case "Standard":
            return <ViewListIcon />;
        case "List":
            return <ViewHeadlineIcon />;
        case "Images":
            return <ViewModuleIcon />;
    }
};

const DisplayRow = styled.div`
    display: flex;
    align-items: center;

    & .MuiTypography-root {
        margin-right: ${p => p.theme.spacing(1)}px;
    }

    & .MuiButton-root {
        padding-left: 0;
        padding-right: 0;
    }
`;

type Props = {
    cards: (DeckCard & ScrySdk.Card)[];
};

const CollectionPreview: React.FC<Props> = ({ cards }) => {
    const [style, setStyle] = React.useState<PreviewStyle>("Standard");

    const updateStyle = (newStyle: PreviewStyle) => () => setStyle(newStyle);

    const renderCollection = () => {
        switch (style) {
            case "List":
                return <ListCollecion cards={cards} />;
        }
    };

    return (
        <>
            <Grid container>
                <FlexCol />
                <DisplayRow>
                    <Typography>Display:</Typography>
                    <ButtonGroup variant="outlined" size="small">
                        {(["Standard", "List", "Images"] as const).map(s => (
                            <Button key={s} onClick={updateStyle(s)} variant={style === s ? "contained" : undefined}>
                                <Tooltip title={s}>{IconForStyle(s)}</Tooltip>
                            </Button>
                        ))}
                    </ButtonGroup>
                </DisplayRow>
            </Grid>
            <Grid item>{renderCollection()}</Grid>
        </>
    );
};

export default CollectionPreview;
