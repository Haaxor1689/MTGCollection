import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import ScrySdk from "scryfall-sdk";
import { DeckCard } from "../../State";
import SymbolTypography from "../SymbolTypography";

type Props = {
    card: DeckCard & ScrySdk.Card;
};

const ListCard: React.FC<Props> = ({ card }) => {
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {card.amount}
            </TableCell>
            <TableCell>{card.name}</TableCell>
            <TableCell>{card.set}</TableCell>
            <TableCell>
                <SymbolTypography text={card.mana_cost ?? ""} />
            </TableCell>
            <TableCell>{card.type_line}</TableCell>
        </TableRow>
    );
};
export default ListCard;
