import React from "react";
import { Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import SymbolIcon from "./SymbolIcon";

type Props = TypographyProps & {
    text: string;
};

const SymbolTypography: React.FC<Props> = ({ text, ...typographyProps }) => {
    const [parsed, setParsed] = React.useState<JSX.Element[]>([]);
    React.useEffect(() => {
        setParsed(text.match(/({.*?})|([^{]+)/g)!.map((m, i) => (m[0] === "{" ? <SymbolIcon key={i} symbol={m} /> : <span key={i}>{m}</span>)));
    }, [text]);
    return <Typography {...typographyProps}>{parsed}</Typography>;
};

export default SymbolTypography;
