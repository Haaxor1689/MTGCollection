import React from "react";
import { Flex } from "reflexbox";
import { LifecounterState } from "../../../State/Lifecounter";
import useDimensions from "../../../Utility/useDimensions";
import styled, { css } from "../../Styled/Theme";

const Wrapper = styled.div<{ flexBasis: string; players: number }>`
    position: relative;
    height: ${p => (p.players > 4 ? 100.0 / 3.0 : 50)}%;
    flex-basis: ${p => p.flexBasis};
`;

const Body = styled(Flex)<{ rotate: number; w: number; h: number }>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: rotate(${p => p.rotate}deg) translate(-50%, -50%);
    transform-origin: top left;
    ${p =>
        Math.abs(p.rotate) === 90
            ? css`
                  width: ${p.h}px;
                  height: ${p.w}px;
              `
            : css`
                  width: ${p.w}px;
                  height: ${p.h}px;
              `}
`;

type PlayerCount = 2 | 3 | 4 | 5 | 6;
type PlayerTransform = {
    rotate: number;
    flexBasis: string;
};

const PlayerTransforms: Record<PlayerCount, PlayerTransform[]> = {
    2: [
        { rotate: 180, flexBasis: "100%" },
        { rotate: 0, flexBasis: "100%" },
    ],
    3: [
        { rotate: 90, flexBasis: "50%" },
        { rotate: -90, flexBasis: "50%" },
        { rotate: 0, flexBasis: "100%" },
    ],
    4: [
        { rotate: 90, flexBasis: "50%" },
        { rotate: -90, flexBasis: "50%" },
        { rotate: 90, flexBasis: "50%" },
        { rotate: -90, flexBasis: "50%" },
    ],
    5: [
        { rotate: 90, flexBasis: "50%" },
        { rotate: -90, flexBasis: "50%" },
        { rotate: 90, flexBasis: "100%" },
        { rotate: 90, flexBasis: "50%" },
        { rotate: -90, flexBasis: "50%" },
    ],
    6: [
        { rotate: 90, flexBasis: "50%" },
        { rotate: -90, flexBasis: "50%" },
        { rotate: 90, flexBasis: "50%" },
        { rotate: -90, flexBasis: "50%" },
        { rotate: 90, flexBasis: "50%" },
        { rotate: -90, flexBasis: "50%" },
    ],
};

type Props = {
    player: number;
};
const PlayerCard: React.FC<Props> = ({ player }) => {
    const [state] = React.useContext(LifecounterState);
    const [ref, width, height] = useDimensions<HTMLDivElement>();

    const { rotate, flexBasis } = PlayerTransforms[state.players.length as PlayerCount][player];
    return (
        <Wrapper ref={ref} flexBasis={flexBasis} players={state.players.length}>
            <Body rotate={rotate} w={width} h={height} backgroundColor="blue" flexGrow={1} alignItems="center" justifyContent="center">
                Player {player}
            </Body>
        </Wrapper>
    );
};
export default PlayerCard;
