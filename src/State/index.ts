import React from "react";
import Scry from "scryfall-sdk";
import { Action } from "./Actions";
import DeepReadonly from "../Utility/DeepReadonly";

export type DeckCard = DeepReadonly<{
    amount: number;
    name: string;
    isFoil?: boolean;
    set?: string;
    comment?: string;
}>;

export type Deck = DeepReadonly<DeckCard[]>;

export type FileIds = DeepReadonly<{
    collection: string;
    [deckName: string]: string;
}>;

export type Decks = DeepReadonly<{
    collection: Deck;
    [deckName: string]: Deck;
}>;

export type CardList = DeepReadonly<{
    [cardName: string]: Scry.Card;
}>;

export type AppState = DeepReadonly<{
    files: FileIds;
    decks: Decks;
    cardList: CardList;
}>;

export const initialState: AppState = {
    files: {
        collection: "",
    },
    decks: {
        collection: [],
    },
    cardList: {},
};

export const State = React.createContext<[AppState, React.Dispatch<Action>]>([initialState, undefined as any]);
