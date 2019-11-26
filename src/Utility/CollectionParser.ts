import { isNull } from "lodash";
import Papa from "papaparse";
import { Deck } from "../State";

const parse = (collection: string): Deck => {
    if (!collection || collection === "") {
        return [];
    }
    if (collection.match(/^([\D_]+,?)+/)) {
        return parseCsv(collection);
    }
    return parseSimple(collection);
};

const parseSimple = (collection: string): Deck =>
    collection
        .split("\n")
        .filter(line => !line.match(/^\s*$/) && !line.startsWith("//"))
        .map(line => line.match(/^(\d*) (?:\[(.*)\] )?(.*)$/))
        .filter(match => !isNull(match))
        .map(match => ({
            amount: parseInt(match![1]),
            name: match![3],
            set: match![2],
        }));

const parseCsv = (collection: string): Deck => {
    const result = Papa.parse(collection, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: "greedy",
    });
    if (result.errors && result.errors.length > 0) {
        result.errors.forEach(console.error);
    }
    return result.data.map(c => ({
        amount: c.amount,
        name: c.name || c.card_name,
        isFoil: c.isFoil || c.is_foil === 1,
        set: c.set || c.set_code,
        comment: c.comment,
    }));
};

const CollectionParser = {
    parse,
};

export default CollectionParser;
