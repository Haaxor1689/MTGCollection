import { Link, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { isNullOrUndefined } from "util";
import useCardActions from "../../Utility/useCardAction";
import IncrementNumber from "../Styled/IncrementNumber";
import SetIcon from "../Styled/SetIcon";
import SymbolTypography from "../Styled/SymbolTypography";
import styled from "../Styled/Theme";
import ChangeSectionButton from "./ActionButtons/ChangeSectionButton";
import DeleteButton from "./ActionButtons/DeleteButton";
import WishlistButton from "./ActionButtons/WishlistButton";
import { CollectionCardProps } from "./CollectionPreview";
import { NumberCell } from "./ListCollection";

const Actions = styled.div`
    white-space: nowrap;
    & > *:not(:last-child) {
        margin-right: ${p => p.theme.spacing(0.5)}px;
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
            <TableCell align="center">
                <SetIcon set={card.set} rarity={card.rarity} />
            </TableCell>
            <TableCell>
                <SymbolTypography text={card.mana_cost ?? ""} noWrap />
            </TableCell>
            <TableCell>{card.type_line}</TableCell>
            <TableCell>
                <Actions>
                    <WishlistButton actions={actions} size="small" />
                    <ChangeSectionButton actions={actions} size="small" />
                    <DeleteButton actions={actions} size="small" />
                </Actions>
            </TableCell>
        </TableRow>
    );
};
export default ListCard;
