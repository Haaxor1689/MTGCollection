import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { IconButtonProps } from "@material-ui/core/IconButton/IconButton";
import React from "react";
import styled, { css } from "./Theme";

const StyledIconButton = styled(IconButton)<{ background?: "primary" | "secondary" }>`
    ${p =>
        p.background &&
        css`
            background-color: ${p.theme.palette[p.background].main};
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
    background?: "primary" | "secondary";
};

const TooltipButton: React.FC<Props> = ({ onClick, title, size, background, children }) => {
    return (
        <Tooltip title={title}>
            <StyledIconButton size={size} background={background} onClick={onClick} aria-label={title}>
                {children}
                <Typography variant="srOnly">{title}</Typography>
            </StyledIconButton>
        </Tooltip>
    );
};

export default TooltipButton;
