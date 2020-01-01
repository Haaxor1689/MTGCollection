export type ScryCardSymbol = {
    symbol: string;
    svg_uri: string;
    svg: string;
    loose_variant: string | null;
    english: string;
    represents_mana: boolean;
    cmc: number | null;
};

export type ScryCardIdentifier =
    | {
          id: string;
      }
    | {
          name: string;
          set?: string;
      };

export type ScryManaCost = {
    cost: string;
    colors: string[];
    cmc: number;
    colorless: boolean;
    monocolored: boolean;
    multicolored: boolean;
};

export type ScrySet = {
    code: string;
    name: string;
    icon_svg_uri: string;
    icon_svg: string;
};

export type ScryCardRarity = "common" | "uncommon" | "rare" | "mythic";
export type ScryCardImageUris = Record<"small" | "normal" | "large" | "png" | "art_crop" | "border_crop", string>;
export type ScryCardLayout =
    | "normal"
    | "split"
    | "flip"
    | "transform"
    | "meld"
    | "leveler"
    | "saga"
    | "planar"
    | "scheme"
    | "vanguard"
    | "token"
    | "double_faced_token"
    | "emblem"
    | "augment"
    | "host";
export type ScryCardColor = "W" | "U" | "B" | "R" | "G";

export type ScryCardFace = {
    object: "card_face";
    artist: string;
    color_indicator: ScryCardColor[];
    colors: ScryCardColor[];
    flavor_text: string;
    image_uris: ScryCardImageUris;
    oracle_text: string;
};

export type ScryCard = {
    id: string;
    object: "card";
    layout: ScryCardLayout;
    card_faces: ScryCardFace[] | null;
    color_identity: ScryCardColor[];
    mana_cost: string;
    type_line: string;
    rarity: ScryCardRarity;
    set: string;
    scryfall_uri: string;
    scryfall_set_uri: string;
} & Omit<ScryCardFace, "object">;
