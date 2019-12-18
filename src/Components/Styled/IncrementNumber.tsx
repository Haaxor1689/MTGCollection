import { Avatar } from "@material-ui/core";
import { AvatarProps } from "@material-ui/core/Avatar";
import React from "react";
import { State } from "../../State";
import styled, { ComponentProps, css } from "./Theme";

type StyledAvatarProps = { action: "+" | "-"; size: Props["size"] } & AvatarProps;

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

    &:hover:before {
        content: "${p => p.action}";
    }
`;

type Props = {
    val: number;
    onChange: (val: number) => void;
    size?: "chip" | "inline";
};

const IncrementNumber: React.FC<Props> = ({ val, onChange, size }) => {
    const state = React.useContext(State)[0];

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onChange(val + (state.modifierKeys.shift ? 1 : -1));
    };
    return (
        <StyledAvatar title="" onClick={onClick} action={state.modifierKeys.shift ? "+" : "-"} size={size}>
            {val}
        </StyledAvatar>
    );
};
export default IncrementNumber;
