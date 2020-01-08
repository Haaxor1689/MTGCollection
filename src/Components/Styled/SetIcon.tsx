import React from "react";
import { AppState } from "../../State";
import { ScryCardRarity, ScrySet } from "../../Utility/Scry/Types";
import styled from "./Theme";

const Set = styled.svg<{ rarity: ScryCardRarity }>`
    width: 25px;
    height: 20px;
    fill: url(#rarity-${p => p.rarity});
`;

type Props = {
    set: string;
    rarity: ScryCardRarity;
};

const SetIcon: React.FC<Props> = ({ set, rarity }) => {
    const [state] = React.useContext(AppState);
    const [setObj, setSetObj] = React.useState<ScrySet>();
    React.useEffect(() => {
        setSetObj(state.setList[set]);
    }, [set, state.setList]);
    return setObj ? (
        <Set rarity={rarity}>
            <defs>
                <linearGradient id="rarity-common">
                    <stop offset="0%" stopColor="#000" />
                </linearGradient>
                <linearGradient id="rarity-uncommon" gradientTransform="rotate(90)">
                    <stop offset="0%" stopColor="#4d565a" />
                    <stop offset="50%" stopColor="#a0c3d3" />
                    <stop offset="100%" stopColor="#4d565a" />
                </linearGradient>
                <linearGradient id="rarity-rare" gradientTransform="rotate(90)">
                    <stop offset="0%" stopColor="#85723e" />
                    <stop offset="50%" stopColor="#d4b975" />
                    <stop offset="100%" stopColor="#85723e" />
                </linearGradient>
                <linearGradient id="rarity-mythic" gradientTransform="rotate(90)">
                    <stop offset="0%" stopColor="#b02911" />
                    <stop offset="50%" stopColor="#e87f03" />
                    <stop offset="100%" stopColor="#b02911" />
                </linearGradient>
            </defs>
            <svg dangerouslySetInnerHTML={{ __html: setObj.icon_svg }} />
        </Set>
    ) : (
        <>{set}</>
    );
};

export default SetIcon;
