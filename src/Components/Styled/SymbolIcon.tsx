import React from "react";
import { AppState } from "../../State";
import { ScryCardSymbol } from "../../Utility/Scry/Types";
import styled, { css } from "./Theme";
import { TypographyProps } from "@material-ui/core/Typography";

const sizeMap: [TypographyProps["variant"], number][] = [
    ["h1", 80],
    ["h2", 51],
    ["h3", 42],
    ["h4", 30],
    ["h5", 25],
    ["h6", 20],
    ["subtitle1", 16],
    ["subtitle2", 14],
    ["body1", 16],
    ["body2", 14],
    ["caption", 12],
    ["button", 16],
    ["overline", 14],
];

const Symbol = styled.svg`
    display: inline-block;
    height: 16px;
    width: 16px;
    margin: 1px 1px -2px 1px;

    ${sizeMap.map(
        ([v, size]) => css`
            .MuiTypography-${v} & {
                height: ${size}px;
                width: ${size}px;
            }
        `
    )}
`;

type Props = {
    symbol: string;
};

const SymbolIcon: React.FC<Props> = ({ symbol }) => {
    const [state] = React.useContext(AppState);
    const [symbolObj, setSymbolObj] = React.useState<ScryCardSymbol>();
    React.useEffect(() => {
        setSymbolObj(state.symbolList[symbol] ?? Object.values(state.symbolList).find(s => s.loose_variant === symbol));
    }, [symbol, state.symbolList]);
    return symbolObj ? <Symbol dangerouslySetInnerHTML={{ __html: symbolObj.svg }} /> : <>{symbol}</>;
};

export default SymbolIcon;
