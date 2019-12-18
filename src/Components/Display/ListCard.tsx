import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { isNullOrUndefined } from "util";
import useCardActions from "../../Utility/useCardAction";
import IncrementNumber from "../Styled/IncrementNumber";
import TooltipButton from "../Styled/TooltipButton";
import SymbolTypography from "../SymbolTypography";
import { CollectionCardProps } from "./CollectionPreview";
import { NumberCell } from "./ListCollection";
import styled from "../Styled/Theme";

const Actions = styled.div`
    white-space: nowrap;
    & > *:not(:last-child) {
        margin-right: ${p => p.theme.spacing(1)}px;
    }
`;

const ListCard: React.FC<CollectionCardProps> = props => {
    const actions = useCardActions(props);
    const { card } = props;

    return (
        <TableRow>
            <NumberCell component="th" scope="row" align="center">
                {!isNullOrUndefined(card.amount) ? <IncrementNumber size="inline" val={card.amount} onChange={actions.updateCardQuantity} /> : "-"}
            </NumberCell>
            <TableCell>
                <Link href="#" onClick={actions.openScryfallPage} color="inherit" title="Open on scryfall">
                    {card.name}
                </Link>
            </TableCell>
            <TableCell>{card.set}</TableCell>
            <TableCell>
                <SymbolTypography text={card.mana_cost ?? ""} noWrap />
            </TableCell>
            <TableCell>{card.type_line}</TableCell>
            <TableCell>
                <Actions>
                    <TooltipButton size="small" title={actions.wishlistTooltip()} onClick={actions.toggleWishlist}>
                        {actions.wishlistIcon()}
                    </TooltipButton>
                    <TooltipButton size="small" title="Remove card" onClick={actions.removeCard}>
                        <DeleteIcon />
                    </TooltipButton>
                </Actions>
            </TableCell>
        </TableRow>
    );
};
export default ListCard;
