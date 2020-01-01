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
