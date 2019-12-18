import { Typography } from "@material-ui/core";
import omit from "lodash.omit";
import React from "react";
import ScrySdk from "scryfall-sdk";
import { DeckCard, SectionName } from "../../State";
import CompressedCollecion from "./CompressedCollection";
import ImagesCollecion from "./ImagesCollection";
import ListCollecion from "./ListCollection";

export type PreviewStyle = "Standard" | "List" | "Images" | "Compressed";
export type PreviewActions = "SearchDeck" | "SearchWishlist" | "Deck";
export type SortByOptions = "Name" | "Cmc" | "Type" | "Rarity";
export type SortOrderOptions = "Asc" | "Desc";

export type CollectionPreviewProps = {
    cards: (DeckCard & ScrySdk.Card)[];
    actions: PreviewActions;
    sortBy: SortByOptions;
    sortOrder: SortOrderOptions;
    showGroups: boolean;
    deckName?: string;
    sectionName?: string;
};

export type CollectionCardProps = {
    card: DeckCard & ScrySdk.Card;
    actions: PreviewActions;
    deckName?: string;
    sectionName?: string;
};

const desc = <T extends object>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getSorting = <T extends object>(order: SortOrderOptions, orderBy: keyof T): ((a: T, b: T) => number) => {
    return order === "Desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};

const StableSort = <T extends object>(array: T[], cmp: (a: T, b: T) => number) => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
};

const GetSortFunction = (sortBy: SortByOptions, sortOrder: SortOrderOptions) => {
    switch (sortBy) {
        case "Name":
            return getSorting<DeckCard & ScrySdk.Card>(sortOrder, "name");
        case "Cmc":
            return getSorting<DeckCard & ScrySdk.Card>(sortOrder, "mana_cost");
        case "Type":
            return getSorting<DeckCard & ScrySdk.Card>(sortOrder, "type_line");
        case "Rarity":
            return getSorting<DeckCard & ScrySdk.Card>(sortOrder, "rarity");
    }
};

type Props = CollectionPreviewProps & {
    style: PreviewStyle;
};

const CollectionPreview: React.FC<Props> = props => {
    const renderCollection = () => {
        const passedProps = {
            ...omit(props, "style", "cards"),
            cards: StableSort(props.cards, GetSortFunction(props.sortBy, props.sortOrder)),
        };
        switch (props.style) {
            case "List":
                return <ListCollecion {...passedProps} />;
            case "Images":
                return <ImagesCollecion {...passedProps} />;
            case "Compressed":
                return <CompressedCollecion {...passedProps} />;
        }
    };

    return (
        <>
            {props.sectionName !== SectionName.Default && <Typography variant="h6">{props.sectionName}</Typography>}
            {renderCollection()}
        </>
    );
};

export default CollectionPreview;
