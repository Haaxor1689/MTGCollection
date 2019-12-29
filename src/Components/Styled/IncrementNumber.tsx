import { Avatar, IconButton } from "@material-ui/core";
import { AvatarProps } from "@material-ui/core/Avatar";
import React from "react";
import styled, { ComponentProps, css } from "./Theme";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

type StyledAvatarProps = { size: Props["size"] } & AvatarProps;

const StyledAvatar = styled(Avatar).attrs((p: ComponentProps<StyledAvatarProps>) => ({
    className: p.size === "chip" ? p.className + " MuiChip-avatar MuiChip-avatarSmall" : p.className,
}))<StyledAvatarProps>`
    cursor: pointer;
    color: ${p => p.theme.palette.text.primary};

    ${p =>
        p.size === "inline" &&
        css`
            width: ${p.theme.spacing(3)}px;
            height: ${p.theme.spacing(3)}px;
            font-size: 0.875rem;
        `}
`;

const Body = styled.div`
    display: flex;
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

            &:first-of-type {
                margin-left: 5px;
            }
        `}

    display: none;
    ${Body}:hover & {
        display: block;
    }
`;

type Props = {
    val: number;
    onChange: (val: number) => void;
    size?: "chip" | "inline";
};

const IncrementNumber: React.FC<Props> = ({ val, onChange, size }) => {
    const onClick = (incr: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onChange(val + incr);
    };
    return (
        <Body>
            <StyledAvatar title="" size={size} onClick={e => e.stopPropagation()}>
                {val}
            </StyledAvatar>
            <Arrows s={size} onClick={onClick(1)}>
                <ArrowDropUpIcon />
            </Arrows>
            <Arrows s={size} onClick={onClick(-1)}>
                <ArrowDropDownIcon />
            </Arrows>
        </Body>
    );
};
export default IncrementNumber;
