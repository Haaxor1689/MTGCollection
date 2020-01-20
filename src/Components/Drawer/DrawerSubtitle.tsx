import { Typography } from "@material-ui/core";
import styled, { css } from "../Styled/Theme";

type Props = {
    open: boolean;
};

const DrawerSubtitle = styled(Typography)<Props>`
    color: ${p => p.theme.palette.grey[500]};
    padding: ${p => p.theme.spacing(0, 2, 0, 2)};

    transition: padding 0.5s ease-in-out, opacity 0.5s ease-in-out;

    height: 0;
    opacity: 1;

    ${p =>
        !p.open &&
        css`
            opacity: 0;
        `}
    ${p =>
        p.open &&
        css`
            padding: ${p.theme.spacing(2, 2, 4, 2)};
        `}
`;
export default DrawerSubtitle;
