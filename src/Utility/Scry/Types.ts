export type ScryCardSymbol = {
    symbol: string;
    svg_uri: string;
    loose_variant: string | null;
    english: string;
    represents_mana: boolean;
    cmc: number | null;
}

export type ScryManaCost = {
    cost: string;
    colors: string[];
    cmc: number;
    colorless: boolean;
    monocolored: boolean;
    multicolored: boolean;
}