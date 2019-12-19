import React from "react";
import { State } from "../../State";
import { ScryCardSymbol } from "../../Utility/Scry/Types";
import styled from "./Theme";

const Symbol = styled.svg`
    display: inline-block;
    height: 16px;
    width: 16px;
    margin: 1px 1px -2px 1px;
`;

type Props = {
    symbol: string;
};

const SymbolIcon: React.FC<Props> = ({ symbol }) => {
    const [state] = React.useContext(State);
    const [symbolObj, setSymbolObj] = React.useState<ScryCardSymbol>();
    React.useEffect(() => {
        setSymbolObj(state.symbolList[symbol] ?? Object.values(state.symbolList).find(s => s.loose_variant === symbol));
    }, [symbol, state.symbolList]);
    return symbolObj ? <Symbol dangerouslySetInnerHTML={{ __html: symbolObj.svg }} /> : <>{symbol}</>;
};

export default SymbolIcon;
