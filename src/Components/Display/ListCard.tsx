import { TableCell, TableRow, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
import { isNullOrUndefined } from "util";
import { SectionName, State } from "../../State";
import assert from "../../Utility/Assert";
import TooltipButton from "../Styled/TooltipButton";
import SymbolTypography from "../SymbolTypography";
import { CollectionCardProps } from "./CollectionPreview";

const ListCard: React.FC<CollectionCardProps> = ({ card, actions, deckName, sectionName }) => {
    const [state, dispatch] = React.useContext(State);

    const updateCardQuantity = (val: number) => {
        assert(!isNullOrUndefined(deckName), "DeckName should not be empty if the preview actions are Deck");
        console.log({ sectionName });
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
                {card.amount ?? "-"}
            </TableCell>
            <TableCell>{card.name}</TableCell>
            <TableCell>{card.set}</TableCell>
            <TableCell>
                <SymbolTypography text={card.mana_cost ?? ""} noWrap />
            </TableCell>
            <TableCell>{card.type_line}</TableCell>
            <TableCell>
                <Typography noWrap>
                    <TooltipButton size="small" title="Add" onClick={() => updateCardQuantity(card.amount + 1)}>
                        <AddIcon />
                    </TooltipButton>
                    <TooltipButton size="small" title="Remove" onClick={() => updateCardQuantity(card.amount - 1)}>
                        <RemoveIcon />
                    </TooltipButton>
                </Typography>
            </TableCell>
        </TableRow>
    );
};
export default ListCard;
