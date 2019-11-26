import Scry from "scryfall-sdk";
import DeepReadonly from "./DeepReadonly";

const getImage = (card: DeepReadonly<Scry.Card>, type: keyof Scry.ImageUris): string => {
    var images: Scry.ImageUris | null | undefined;
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

const ScryHelpers = {
    getImage,
    getPlaceholder,
};
export default ScryHelpers;