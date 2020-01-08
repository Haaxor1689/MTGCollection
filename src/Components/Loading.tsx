import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { AppletContent } from "./Styled/Grid";
import styled from "./Styled/Theme";

const Body = styled(AppletContent)`
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const MarginedTypography = styled(Typography)`
    margin-top: ${p => p.theme.spacing(2)}px;
`;

const Loading: React.FC = () => (
    <Body>
        <CircularProgress size={60} />
        <MarginedTypography component="h2" variant="h6">
            Loading...
        </MarginedTypography>
    </Body>
);
export default Loading;
