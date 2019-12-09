import Scry from "scryfall-sdk";
import { DeckCard } from ".";
import { ScryCardSymbol } from "../Utility/Scry/Types";

type AddCard = {
    type: "AddCard";
    card: Scry.Card;
};

type AddSymbols = {
    type: "AddSymbols";
    symbols: ScryCardSymbol[];
};

type CreateDeck = {
    type: "CreateDeck";
    name: string;
    link: string;
    previewUrl?: string;
    cards?: DeckCard[];
}

type UpdateDeck = {
    type: "UpdateDeck";
    name: string;
    previewUrl?: string;
    cards?: DeckCard[];
};

type DeleteDeck = {
    type: "DeleteDeck";
    name: string;
};

type SelectDeck = {
    type: "SelectDeck";
    name: string | null;
};

export type Action = CreateDeck | AddCard | AddSymbols | UpdateDeck | DeleteDeck | SelectDeck;
