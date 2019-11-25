import Scry from "scryfall-sdk";
import React from "react";
import { Action } from "./Actions";

export interface DeckCard {
    amount: number;
    name: string;
    isFoil?: boolean;
    set?: string;
    comment?: string;
}

export type Deck = DeckCard[];

export type DeckLink = {
    [deckName: string]: string;
};

export type FileIds = DeckLink & {
    collection: string;
};

export type Decks = {
    collection: Deck;
    [deckName: string]: Deck;
};

export interface CardList {
    [cardName: string]: Scry.Card;
}

export interface AppState {
    files: FileIds;
    decks: Decks;
    cardList: CardList;
}

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
