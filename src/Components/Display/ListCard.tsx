import { TableCell, TableRow, TextField } from "@material-ui/core";
import React from "react";
import { isNullOrUndefined } from "util";
import { SectionName, State } from "../../State";
import assert from "../../Utility/Assert";
import SymbolTypography from "../SymbolTypography";
import { CollectionCardProps } from "./CollectionPreview";

const ListCard: React.FC<CollectionCardProps> = ({ card, actions, deckName, sectionName }) => {
    const dispatch = React.useContext(State)[1];

    const updateCardQuantity = (val: number) => {
        assert(!isNullOrUndefined(deckName), "DeckName should not be empty if the preview actions are Deck");
        console.log({sectionName});
        dispatch({
            type: "UpdateDeckCard",
            deckName,
            sectionName: sectionName ?? SectionName.Default,
            card: {
                ...card,
                amount: val,
            },
        });
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row" align="right">
                {actions === "Deck" && (
                    <TextField
                        type="number"
                        value={card.amount}
                        onChange={e => updateCardQuantity(parseInt(e.target.value))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                )}
            </TableCell>
            <TableCell>{card.name}</TableCell>
            <TableCell>{card.set}</TableCell>
            <TableCell>
                <SymbolTypography text={card.mana_cost ?? ""} noWrap />
            </TableCell>
            <TableCell>{card.type_line}</TableCell>
        </TableRow>
    );
};
export default ListCard;
