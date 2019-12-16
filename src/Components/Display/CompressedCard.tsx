import { Avatar, Chip } from "@material-ui/core";
import React from "react";
import styled from "../Styled/Theme";
import SymbolTypography from "../SymbolTypography";
import { CollectionCardProps } from "./CollectionPreview";

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
        cursor: default;
        flex-shrink: 0;
        margin-left: ${p => p.theme.spacing(1)}px;
        margin-top: -4px;
    }
`;

const CompressedCard: React.FC<CollectionCardProps> = ({ card }) => {
    return (
        <CustomChip
            size="small"
            variant="outlined"
            label={card.name}
            deleteIcon={<SymbolTypography text={card.mana_cost ?? ""} noWrap />}
            onDelete={() => {}}
            avatar={<Avatar>{card.amount}</Avatar>}
        />
    );
};
export default CompressedCard;
