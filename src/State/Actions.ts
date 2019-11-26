import Scry from "scryfall-sdk";
import { Deck } from ".";

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
    cardList: Deck;
};

type DeleteDeck = {
    type: "DeleteDeck";
    name: string;
};

export type Action = SetDeckLink | AddCard | UpdateDeck | DeleteDeck;
