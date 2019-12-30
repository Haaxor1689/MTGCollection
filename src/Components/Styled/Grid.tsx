import { Avatar, Paper, Typography } from "@material-ui/core";
import styled from "./Theme";

export const FlexCol = styled.div`
    flex: 1 1 auto;
`;

export const AppletContent = styled(Paper)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-height: ${p => p.theme.constants.appletHeight};
    padding: ${p => p.theme.spacing(2)}px;
    overflow: hidden;
`;

export const AppletActions = styled.div`
    align-self: flex-end;
`;

export const Title = styled(Typography).attrs(p => ({
    component: "h2",
    variant: "h6",
    color: "primary",
    gutterBottom: true,
}))``;

export const DrawerAvatar = styled(Avatar)`
    background-color: ${p => p.theme.palette.background.paper};
    color: ${p => p.theme.palette.text.secondary};
`;
