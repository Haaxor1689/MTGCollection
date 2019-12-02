import styled from "./Theme";
import { Paper } from "@material-ui/core";

export const FlexCol = styled.div`
    flex: 1 1 auto;
`;

export const AppletPaper = styled(Paper)`
    min-height: ${p => p.theme.constants.appletHeight};
    padding: ${p => p.theme.spacing(2)}px;
`;