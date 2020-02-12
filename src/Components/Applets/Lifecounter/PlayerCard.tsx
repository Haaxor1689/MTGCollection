import { Button, Typography, useMediaQuery } from "@material-ui/core";
import React from "react";
import { Flex } from "reflexbox";
import { CounterVariant, LifecounterState } from "../../../State/Lifecounter";
import { debounce } from "../../../Utility";
import useDimensions from "../../../Utility/useDimensions";
import SymbolTypography from "../../Styled/SymbolTypography";
import styled, { css, MainTheme } from "../../Styled/Theme";

const Wrapper = styled.div<{ flexBasis: string; players: number }>`
    position: relative;
    height: ${p => (p.players > 4 ? 100.0 / 3.0 : 50)}%;
    flex-basis: ${p => p.flexBasis};
`;

const Body = styled(Flex)<{ rotate: number; w: number; h: number }>`
    position: absolute;
    left: 50%;
    top: 50%;
    background: radial-gradient(circle, ${p => p.theme.palette.background.paper} 0%, ${p => p.theme.palette.background.default} 75%);
    border: 2px dashed ${p => p.theme.palette.background.paper};
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

const Counter = styled(Flex)`
    position: relative;
`;

const IncrementButton = styled(Button)<{ position: "left" | "right" }>`
    position: absolute;
    ${p => p.position}: 0;
    ${p => `padding-${p.position}`}: 10%;
    justify-content: ${p => `flex-${p.position === "left" ? "start" : "end"}`};
    top: 0;
    bottom: 0;
    width: 50%;
`;

const CounterBackground = styled(SymbolTypography)`
    position: absolute;
    opacity: 0.1;
    transform: scale(2);
    line-height: 0;
`;

const DebouncedValue = styled(Typography)`
    position: absolute;
    top: ${p => p.theme.spacing(2)}px;
`;

const IconButton = styled(Button)<{ selected: boolean }>`
    min-width: unset;
    ${p =>
        !p.selected &&
        css`
            filter: grayscale(1);
            opacity: 0.25;
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
        { rotate: 180, flexBasis: "100%" },
        { rotate: 90, flexBasis: "50%" },
        { rotate: -90, flexBasis: "50%" },
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
    const [state, dispatch] = React.useContext(LifecounterState);
    const [ref, width, height] = useDimensions<HTMLDivElement>();

    const [activeCounter, setActiveCounter] = React.useState<CounterVariant>();
    const [debouncedValue, setDebouncedValue] = React.useState<number>(0);

    const { name, life, counters } = state.players[player];
    const activeValue = activeCounter ? counters[activeCounter]! : life;
    const activeDiff = activeValue - debouncedValue;

    // eslint-disable-next-line
    React.useEffect(() => setDebouncedValue(activeValue), [activeCounter]);

    const debouncedSet = React.useCallback(debounce(setDebouncedValue, 1000), []);
    const setCounter = (value: number) => {
        debouncedSet(activeValue + value);
        dispatch({ type: "SetPlayerCounter", player, value, counter: activeCounter });
    };

    const isMobile = useMediaQuery(MainTheme.breakpoints.down("xs"));
    const valueTextVariant = React.useMemo(() => (isMobile ? "h2" : "h1"), [isMobile]);

    const bg = React.useMemo(() => `hsl(${Math.random() * 360}, 20%, 30%)`, []);

    const { rotate, flexBasis } = PlayerTransforms[state.players.length as PlayerCount][player];
    return (
        <Wrapper ref={ref} flexBasis={flexBasis} players={state.players.length}>
            <Body rotate={rotate} w={width} h={height} backgroundColor={bg} flexGrow={1} flexDirection="column" justifyContent="center">
                <Flex py={3} height="20%" justifyContent="center" alignItems="center">
                    <Typography variant="caption" align="center">
                        {name}
                    </Typography>
                </Flex>
                <Counter flexGrow={1} justifyContent="center" alignItems="center">
                    <CounterBackground variant={valueTextVariant} text={activeCounter ?? "{PW}"} />
                    {activeDiff !== 0 && (
                        <DebouncedValue color="primary" variant="h6">
                            {activeDiff > 0 ? "+" : ""}
                            {activeDiff}
                        </DebouncedValue>
                    )}
                    <IncrementButton position="left" onClick={() => setCounter(-1)}>
                        <Typography variant="h6">-</Typography>
                    </IncrementButton>
                    <Typography variant={valueTextVariant} align="center">
                        {activeValue}
                    </Typography>
                    <IncrementButton position="right" onClick={() => setCounter(1)}>
                        <Typography variant="h6">+</Typography>
                    </IncrementButton>
                </Counter>
                <Flex mx={3} height="20%" justifyContent="space-evenly" alignItems="center">
                    {Object.keys(counters).map(c => (
                        <Flex key={c} mx={3} justifyContent="center" alignItems="center">
                            <IconButton
                                selected={activeCounter === c}
                                onClick={() => setActiveCounter(activeCounter === c ? undefined : (c as CounterVariant))}
                            >
                                <SymbolTypography variant="h6" text={`${counters[c as CounterVariant]} ${c}`} />
                            </IconButton>
                        </Flex>
                    ))}
                </Flex>
            </Body>
        </Wrapper>
    );
};
export default PlayerCard;
