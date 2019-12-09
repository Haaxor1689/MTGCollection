import Scry from "scryfall-sdk";
import { DeckCard } from ".";

type SetDeckLink = {
    type: "SetDeckLink";
    name: string;
    link: string;
};

type AddCard = {
    type: "AddCard";
    card: Scry.Card;
};

type UpdateDeck = {
    type: "UpdateDeck";
    name: string;
    previewUrl?: string;
    cardList?: DeckCard[];
};

type DeleteDeck = {
    type: "DeleteDeck";
    name: string;
};

type SelectDeck = {
    type: "SelectDeck";
    name: string | null;
};

export type Action = SetDeckLink | AddCard | UpdateDeck | DeleteDeck | SelectDeck;
