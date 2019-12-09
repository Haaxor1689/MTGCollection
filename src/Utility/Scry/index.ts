import ScrySdk from "scryfall-sdk";
import DeepReadonly from "../DeepReadonly";
import Axios from "axios";
import { ScryCardSymbol, ScryManaCost } from "./Types";

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
            All: () => endpoint.get<List<ScryCardSymbol>>("/symbology").then(l => l.data.data),
            ParseMana: (cost: string) => endpoint.get<ScryManaCost>("/symbology/parse-mana", { params: { cost } }),
        },
    };
})();

const getImage = (card: DeepReadonly<ScrySdk.Card>, type: keyof ScrySdk.ImageUris): string => {
    var images: ScrySdk.ImageUris | null | undefined;
    switch (card.layout) {
        case "transform":
        case "double_faced_token":
            images = card.card_faces![0].image_uris;
            break;
        default:
            images = card.image_uris;
    }
    return images?.[type] ?? getPlaceholder(card.name);
};

const getPlaceholder = (cardName: string): string => `https://via.placeholder.com/146x204?text=${cardName.replace(/\s/, "+")}`;

const Scry = {
    ...Api,
    getImage,
    getPlaceholder,
};
export default Scry;
