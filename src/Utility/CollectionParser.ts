import { isNull } from "lodash";
import { DeckCard, DeckCards, EmptyCards, SectionName } from "../State";

const serialize = (collection?: string, ...sections: string[]): DeckCards => {
    if (!collection || collection === "") {
        return EmptyCards(...sections);
    }
    console.log({ collection });
    return collection
        .split("##")
        .map((section, index) => {
            let name: string, lines: string[];
            if (index === 0) {
                name = SectionName.Default;
                lines = section.split(/\r?\n/);
            } else {
                [name, ...lines] = section.split(/\r?\n/);
            }
            return [
                name,
                lines
                    .map(line => line.match(/^(\d*) +(.*?)(?: # (.*))?$/))
                    .filter(match => !isNull(match))
                    .map(match => ({
                        amount: parseInt(match![1]),
                        name: match![2],
                        comment: match![3],
                    })),
            ] as [string, DeckCard[]];
        })
        .reduce(
            (prev, val) => ({ ...prev, [val[0]]: val[1].reduce((p, v) => ({ ...p, [v.name]: v }), {}) }),
            EmptyCards(...sections)
        );
};

const deserialize = (deck: DeckCards) =>
    Object.entries(deck).reduce(
        (str, section) =>
            `${str}${section[0] !== SectionName.Default ? `#${section[0]}\n` : ""}${Object.values(section[1]).reduce(
                (s, card) => `${s}${card.amount} ${card.name}${card.comment ? ` # ${card.comment}` : ""}\n`,
                ""
            )}\n`,
        ""
    );

const CollectionParser = {
    serialize,
    deserialize,
};

export default CollectionParser;
