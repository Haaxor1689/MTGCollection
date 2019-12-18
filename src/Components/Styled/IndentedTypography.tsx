import styled from "./Theme";
import { Typography } from "@material-ui/core";

const IndentedTypography = styled(Typography)`
    text-indent: ${p => p.theme.spacing(1)}px;
`;
export default IndentedTypography;
