import Axios from "axios";
import ScrySdk from "scryfall-sdk";
import { Arr, ArrayChunk } from "..";
import DeepReadonly from "../DeepReadonly";
import { ScryCardIdentifier, ScryCardSymbol, ScryManaCost, ScrySet } from "./Types";

type List<T = any> = {
    data: T[];
};

const Api = (() => {
    let endpoint = Axios.create({
        baseURL: "https://api.scryfall.com",
        responseType: "json",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return {
        endpoint,
        Symbology: {
            All: () => endpoint.get<List<ScryCardSymbol>>("/symbology").then(r => r.data.data),
            ParseMana: (cost: string) =>
                endpoint
                    .get<ScryManaCost>("/symbology/parse-mana", { params: { cost } })
                    .then(r => r.data),
        },
        Cards: {
            Autocomplete: (q: string) =>
                endpoint
                    .get<List<string>>("/cards/autocomplete", { params: { q, include_extras: true } })
                    .then(r => r.data.data),
            Named: (fuzzy: string) =>
                endpoint
                    .get<ScrySdk.Card>("/cards/named", { params: { fuzzy } })
                    .then(r => r.data),
            Collection: (cards: ScryCardIdentifier[]) =>
                (cards?.length ?? 0) <= 0
                    ? Promise.resolve([])
                    : Promise.all(
                        ArrayChunk(cards, 75).map(identifiers => endpoint.post<List<ScrySdk.Card>>("/cards/collection", { identifiers }))
                    ).then(r => r.flatMap(v => v.data.data)),
        },
        Sets: {
            All: () => endpoint.get<List<ScrySet>>("/sets").then(r => r.data.data),
        },
    };
})();

const getImage = (card: DeepReadonly<ScrySdk.Card>, type: keyof ScrySdk.ImageUris): string | null => {
    var images: ScrySdk.ImageUris | null | undefined;
    switch (card.layout) {
        case "transform":
        case "double_faced_token":
            images = card.card_faces![0].image_uris;
            break;
        default:
            images = card.image_uris;
    }
    return images?.[type] ?? null;
};

const getPlaceholder = (cardName: string): string => `https://via.placeholder.com/146x204?text=${cardName.replace(/\s/, "+")}`;

const getColorIdentity = (...cards: DeepReadonly<ScrySdk.Card>[]): string =>
    cards
        .filter(Arr.NotNull)
        .flatMap(c => c.color_identity)
        .filter(Arr.Unique)
        .map(c => `{${c}}`)
        .join("");

const Scry = {
    ...Api,
    getImage,
    getPlaceholder,
    getColorIdentity,
};
export default Scry;
