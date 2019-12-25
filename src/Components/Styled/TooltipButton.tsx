import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { IconButtonProps } from "@material-ui/core/IconButton/IconButton";
import React from "react";
import styled, { css } from "./Theme";
import { darken, fade } from "@material-ui/core/styles";

const StyledIconButton = styled(IconButton)<{ background?: "primary" | "secondary" }>`
    ${p =>
        p.background &&
        css`
            background-color: ${p.theme.palette[p.background].main};
            &.Mui-disabled {
                background-color: ${darken(p.theme.palette[p.background].main, 0.3)};
            }
        `};
    &:hover {
        ${p =>
        p.background &&
            css`
                background-color: ${p.theme.palette[p.background].dark};
            `};
    }
`;

type Props = {
    onClick: () => void;
    title: string;
    size?: IconButtonProps["size"];
    disabled?: boolean;
    background?: "primary" | "secondary";
};

const TooltipButton: React.FC<Props> = ({ onClick, title, size, background, disabled, children }) => {
    return (
        <Tooltip title={title}>
            <span>
                <StyledIconButton size={size} background={background} disabled={disabled} onClick={onClick} aria-label={title}>
                    {children}
                    <Typography variant="srOnly">{title}</Typography>
                </StyledIconButton>
            </span>
        </Tooltip>
    );
};
export default TooltipButton;
