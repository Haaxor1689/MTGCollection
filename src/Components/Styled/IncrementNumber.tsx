import { Avatar, IconButton, Popper } from "@material-ui/core";
import { AvatarProps } from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import React from "react";
import styled, { css } from "./Theme";

type StyledAvatarProps = { size: Props["size"]; open: boolean } & AvatarProps;

const StyledAvatar = styled(Avatar).attrs<StyledAvatarProps>(p => ({
    className: p.size === "chip" ? p.className + " MuiChip-avatar MuiChip-avatarSmall" : p.className,
}))<StyledAvatarProps>`
    cursor: pointer;
    color: ${p => p.theme.palette.text.primary};
    ${p =>
        p.open &&
        css`
            background-color: ${p.theme.palette.grey[500]};
        `}

    ${p =>
        p.size === "inline" &&
        css`
            width: ${p.theme.spacing(3)}px;
            height: ${p.theme.spacing(3)}px;
            font-size: 0.875rem;
        `}
`;

const pxFromSize = (size: Props["size"]) => {
    switch (size) {
        case "chip":
            return 9;
        case "inline":
            return 12;
        case undefined:
            return 20;
    }
};

const Body = styled.div<{ size: Props["size"] }>`
    display: flex;
    flex-direction: column;
    transform: translate(calc(50% + ${p => pxFromSize(p.size)}px), calc(-100% + ${p => pxFromSize(p.size)}px));
    background-color: ${p => p.theme.palette.grey[600]};
    border-radius: ${p => pxFromSize(p.size)}px;
`;

const Arrows = styled(IconButton)<{ s: Props["size"] }>`
    height: ${p => (!p.s ? 40 : p.s === "chip" ? 18 : 24)}px;
    width: ${p => (!p.s ? 40 : p.s === "chip" ? 18 : 24)}px;
    padding: 0;
    ${p =>
        p.s === "chip" &&
        css`
            & .MuiIconButton-label {
                margin-top: -3px;
            }
        `}
    &:first-of-type {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    &:last-of-type {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
`;

type Props = {
    val: number;
    onChange: (val: number) => void;
    size?: "chip" | "inline";
};

const IncrementNumber: React.FC<Props> = ({ val, onChange, size }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const open = !!anchorEl;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(!anchorEl ? e.currentTarget : null);
        e.stopPropagation();
    };

    const onIncrement = (incr: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onChange(val + incr);
    };

    return (
        <>
            <StyledAvatar title="" size={size} onClick={handleClick} open={open}>
                {val}
            </StyledAvatar>
            <Popper open={open} anchorEl={anchorEl}>
                <Body size={size}>
                    <Arrows s={size} onClick={onIncrement(1)}>
                        <ArrowDropUpIcon />
                    </Arrows>
                    <Arrows s={size} onClick={onIncrement(-1)}>
                        <ArrowDropDownIcon />
                    </Arrows>
                </Body>
            </Popper>
        </>
    );
};
export default IncrementNumber;
