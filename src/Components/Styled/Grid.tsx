import { Paper, Typography } from "@material-ui/core";
import styled from "./Theme";

export const FlexCol = styled.div`
    flex: 1 1 auto;
`;

export const AppletPaper = styled(Paper)`
    min-height: ${p => p.theme.constants.appletHeight};
    padding: ${p => p.theme.spacing(2)}px;
`;

export const Title = styled(Typography).attrs(p => ({
    component: "h2",
    variant: "h6",
    color: "primary",
    gutterBottom: true,
}))``;
