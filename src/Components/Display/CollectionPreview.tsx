import { Grid, Typography } from "@material-ui/core";
import omit from "lodash.omit";
import React from "react";
import ScrySdk from "scryfall-sdk";
import { DeckCard, SectionName } from "../../State";
import ImagesCollecion from "./ImagesCollection";
import ListCollecion from "./ListCollection";
import CompressedCollecion from "./CompressedCollection";

export type PreviewStyle = "Standard" | "List" | "Images" | "Compressed";
export type PreviewActions = "SearchDeck" | "SearchWishlist" | "Deck";

export type CollectionPreviewProps = {
    cards: (DeckCard & ScrySdk.Card)[];
    actions: PreviewActions;
    deckName?: string;
    sectionName?: string;
};

export type CollectionCardProps = {
    card: DeckCard & ScrySdk.Card;
    actions: PreviewActions;
    deckName?: string;
    sectionName?: string;
};

type Props = CollectionPreviewProps & {
    style: PreviewStyle;
};

const CollectionPreview: React.FC<Props> = props => {
    const renderCollection = () => {
        switch (props.style) {
            case "List":
                return <ListCollecion {...omit(props, "style")} />;
            case "Images":
                return <ImagesCollecion {...omit(props, "style")} />;
            case "Compressed":
                return <CompressedCollecion {...omit(props, "style")} />;
        }
    };

    return (
        <>
            {props.sectionName !== SectionName.Default && <Typography variant="h6">{props.sectionName}</Typography>}
            <Grid item>{renderCollection()}</Grid>
        </>
    );
};

export default CollectionPreview;
