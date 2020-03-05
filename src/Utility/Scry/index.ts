import Axios from "axios";
import { Arr, ArrayChunk, isFulfilledPromise } from "..";
import DeepReadonly from "../DeepReadonly";
import { ScryCard, ScryCardIdentifier, ScryCardImageUris, ScryCardSymbol, ScryManaCost, ScrySet } from "./Types";

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
                    .get<ScryCard>("/cards/named", { params: { fuzzy } })
                    .then(r => r.data),
            Collection: (cards: ScryCardIdentifier[]) =>
                (cards?.length ?? 0) <= 0
                    ? Promise.resolve([])
                    : Promise.allSettled(
                        ArrayChunk(cards, 75).map(identifiers => endpoint.post<List<ScryCard>>("/cards/collection", { identifiers }))
                    ).then(r => r.filter(isFulfilledPromise).flatMap(v => v.value.data.data)),
        },
        Sets: {
            All: () => endpoint.get<List<ScrySet>>("/sets").then(r => r.data.data),
        },
    };
})();

const getImage = (card: DeepReadonly<ScryCard>, type: keyof ScryCardImageUris): string | null => {
    let images: ScryCardImageUris | null | undefined;
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

const getColorIdentity = (...cards: DeepReadonly<ScryCard>[]): string =>
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
