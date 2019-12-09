import React from "react";
import { Icon } from "@material-ui/core";
import { State } from "../State";
import { ScryCardSymbol } from "../Utility/Scry/Types";
import styled from "./Styled/Theme";

const Symbol = styled.img`
    height: 15px;
    margin: 1px 1px -1px 1px;
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
    return <Icon>{symbolObj ? <Symbol src={symbolObj.svg_uri} alt={symbolObj.english} /> : symbol ?? "{?}"}</Icon>;
};

export default SymbolIcon;
