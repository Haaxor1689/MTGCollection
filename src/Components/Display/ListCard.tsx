import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
import { isNullOrUndefined } from "util";
import IncrementNumber from "../Styled/IncrementNumber";
import TooltipButton from "../Styled/TooltipButton";
import SymbolTypography from "../SymbolTypography";
import { CollectionCardProps } from "./CollectionPreview";
import { NumberCell } from "./ListCollection";
import useCardActions from "../../Utility/useCardAction";

const ListCard: React.FC<CollectionCardProps> = props => {
    const {updateCardQuantity, openScryfallPage} = useCardActions(props);
    const { card } = props;

    return (
        <TableRow>
            <NumberCell component="th" scope="row" align="center">
                {!isNullOrUndefined(card.amount) ? <IncrementNumber size="inline" val={card.amount} onChange={updateCardQuantity} /> : "-"}
            </NumberCell>
            <TableCell>
                <Link href="#" onClick={openScryfallPage} color="inherit" title="Open on scryfall">
                    {card.name}
                </Link>
            </TableCell>
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
