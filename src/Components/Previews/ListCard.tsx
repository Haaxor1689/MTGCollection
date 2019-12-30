import { Link, TableCell, TableRow } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { isNullOrUndefined } from "util";
import useCardActions from "../../Utility/useCardAction";
import IncrementNumber from "../Styled/IncrementNumber";
import SetIcon from "../Styled/SetIcon";
import SymbolTypography from "../Styled/SymbolTypography";
import styled, { css } from "../Styled/Theme";
import TooltipButton from "../Styled/TooltipButton";
import ChangeSectionButton from "./ActionButtons/ChangeSectionButton";
import DeleteButton from "./ActionButtons/DeleteButton";
import WishlistButton from "./ActionButtons/WishlistButton";
import { CollectionCardProps } from "./CollectionPreview";
import { NameCell, SetWidthCell } from "./ListCollection";

const StyledRow = styled(TableRow)`
    &:hover {
        background-image: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0),
            ${p => p.theme.palette.background.default} 10%,
            ${p => p.theme.palette.background.default} 90%,
            rgba(0, 0, 0, 0)
        );
    }
`;

const Actions = styled.div<{ open: boolean }>`
    white-space: nowrap;
    & > *:not(:last-child) {
        margin-right: ${p => p.theme.spacing(0.5)}px;
    }

    ${p => p.theme.breakpoints.down("xs")} {
        & {
            ${p =>
        !p.open &&
                css`
                    display: none;
                `}

            ${p =>
        p.open &&
                css`
                    position: absolute;
                    transform: translateX(calc(-100% - 4px));
                `}
        }
    }

    ${p => p.theme.breakpoints.between("md", "sm")} {
        & {
            ${p =>
        !p.open &&
                css`
                    display: none;
                `}

            ${p =>
        p.open &&
                css`
                    position: absolute;
                    transform: translateX(calc(-100% - 4px));
                `}
        }
    }
`;

const ActionsMenu = styled.div`
    display: none;
    ${p => p.theme.breakpoints.down("xs")} {
        & {
            display: initial;
        }
    }
    ${p => p.theme.breakpoints.between("md", "sm")} {
        & {
            display: initial;
        }
    }
`;

const ListCard: React.FC<CollectionCardProps> = props => {
    const actions = useCardActions(props);
    const { card } = props;

    const [actionsOpen, setActionsOpen] = React.useState(false);
    const toggleActionsOpen = () => setActionsOpen(prev => !prev);

    return (
        <StyledRow>
            <SetWidthCell width="40px" component="th" scope="row" align="center">
                {!isNullOrUndefined(card.amount) ? <IncrementNumber size="inline" val={card.amount} onChange={actions.updateCardQuantity} /> : "-"}
            </SetWidthCell>
            <NameCell>
                <Link href="#" onClick={actions.openScryfallPage} color="inherit" title="Open on scryfall">
                    {card.name}
                </Link>
            </NameCell>
            <SetWidthCell width="40px" align="center">
                <Link href="#" onClick={actions.openScryfallSetPage} color="inherit" title="Open set on scryfall">
                    <SetIcon set={card.set} rarity={card.rarity} />
                </Link>
            </SetWidthCell>
            <TableCell>
                <SymbolTypography text={card.mana_cost ?? ""} noWrap />
            </TableCell>
            <TableCell style={{ position: "relative" }}>
                <Actions open={actionsOpen}>
                    <WishlistButton actions={actions} size="small" background={actionsOpen ? "secondary" : undefined} />
                    <ChangeSectionButton actions={actions} size="small" background={actionsOpen ? "secondary" : undefined} />
                    <DeleteButton actions={actions} size="small" background={actionsOpen ? "secondary" : undefined} />
                </Actions>
                <ActionsMenu>
                    <TooltipButton title="Actions" onClick={toggleActionsOpen} size="small">
                        <MenuIcon />
                    </TooltipButton>
                </ActionsMenu>
            </TableCell>
        </StyledRow>
    );
};
export default ListCard;
