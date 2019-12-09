import React from "react";
import Scry from "scryfall-sdk";
import DeepReadonly from "../Utility/DeepReadonly";
import { ScryCardSymbol } from "../Utility/Scry/Types";
import { Action } from "./Actions";

export enum DeckName {
    Collection = "_collection",
    Wishlist = "_wishlist",
}

export type DeckCard = DeepReadonly<{
    amount: number;
    name: string;
    isFoil?: boolean;
    set?: string;
    comment?: string;
}>;

export type DeckProps = Omit<Deck, "cards">;

export type Deck = DeepReadonly<{
    name: string;
    previewUrl?: string;
    cards: DeckCard[];
}>;

export type FileIds = DeepReadonly<{
    [DeckName.Collection]: string;
    [DeckName.Wishlist]: string;
    [deckName: string]: string;
}>;

export type Decks = DeepReadonly<{
    [DeckName.Collection]: Deck;
    [DeckName.Wishlist]: Deck;
    [deckName: string]: Deck;
}>;

export type CardList = DeepReadonly<{
    [cardName: string]: Scry.Card;
}>;

export type SymbolList = DeepReadonly<{
    [symbol: string]: ScryCardSymbol;
}>;

export type AppState = DeepReadonly<{
    files: FileIds;
    decks: Decks;
    cardList: CardList;
    symbolList: SymbolList;
    selectedDeck: string | null;
}>;

export const initialState: AppState = {
    files: {
        [DeckName.Collection]: "",
        [DeckName.Wishlist]: "",
    },
    decks: {
        [DeckName.Collection]: { name: DeckName.Collection, cards: [] },
        [DeckName.Wishlist]: { name: DeckName.Wishlist, cards: [] },
    },
    cardList: {},
    symbolList: {},
    selectedDeck: null,
};

export const State = React.createContext<[AppState, React.Dispatch<Action>]>([initialState, undefined as any]);
