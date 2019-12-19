import ScrySdk from "scryfall-sdk";
import DeepReadonly from "../DeepReadonly";
import Axios from "axios";
import { ScryCardSymbol, ScryManaCost, ScrySet } from "./Types";

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
            ParseMana: (cost: string) => endpoint.get<ScryManaCost>("/symbology/parse-mana", { params: { cost } }).then(r => r.data),
        },
        Cards: {
            Autocomplete: (q: string) =>
                endpoint
                    .get<List<string>>("/cards/autocomplete", { params: { q, include_extras: true } })
                    .then(r => r.data.data),
            Named: (fuzzy: string) => endpoint.get<ScrySdk.Card>("/cards/named", { params: { fuzzy } }).then(r => r.data),
        },
        Sets: {
            All: () => endpoint.get<List<ScrySet>>("/sets").then(r => r.data.data),
        }
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

const Scry = {
    ...Api,
    getImage,
    getPlaceholder,
};
export default Scry;
