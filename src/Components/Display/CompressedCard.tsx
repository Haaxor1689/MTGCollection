import { Chip } from "@material-ui/core";
import React from "react";
import IncrementNumber from "../Styled/IncrementNumber";
import styled from "../Styled/Theme";
import SymbolTypography from "../SymbolTypography";
import { CollectionCardProps, useCardActions } from "./CollectionPreview";

const CustomChip = styled(Chip)`
    width: 100%;

    & .MuiChip-label {
        flex: 1 1 auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & .MuiChip-deleteIcon {
        width: unset;
        height: unset;
        flex-shrink: 0;
        margin-left: ${p => p.theme.spacing(1)}px;
        margin-top: -4px;
    }
`;

const CompressedCard: React.FC<CollectionCardProps> = props => {
    const [updateCardQuantity, openScryfallPage] = useCardActions(props);
    const { card } = props;
    return (
        <CustomChip
            size="small"
            variant="outlined"
            label={card.name}
            deleteIcon={<SymbolTypography text={card.mana_cost ?? ""} noWrap />}
            avatar={<IncrementNumber size="chip" val={card.amount} onChange={updateCardQuantity} />}
            onDelete={openScryfallPage}
            onClick={openScryfallPage}
            title="Open on scryfall"
        />
    );
};
export default CompressedCard;
