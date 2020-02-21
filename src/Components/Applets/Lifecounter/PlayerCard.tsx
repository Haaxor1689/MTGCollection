import { Button, Fade, Typography, TypographyTypeMap, useMediaQuery } from "@material-ui/core";
import debounce from "lodash-es/debounce";
import React from "react";
import { Flex } from "reflexbox";
import { CounterVariant, LifecounterState } from "../../../State/Lifecounter";
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
    top: 0;
`;

const IconButton = styled(Button)<{ styled: { selected: boolean; tight?: boolean } }>`
    min-width: unset;
    ${p =>
        !p.styled.selected &&
        css`
            filter: grayscale(1);
            opacity: 0.25;
        `}
    ${p =>
        p.styled.tight &&
        css`
            padding: 4px;
        `}
`;

const StartingPlayerOverlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 1;
`;

type PlayerCount = 2 | 3 | 4 | 5 | 6;
type PlayerTransform = {
    rotate: number;
    flexBasis: string;
    counter?: TypographyTypeMap["props"]["variant"];
};

const PlayerTransforms: Record<PlayerCount, PlayerTransform[]> = {
    2: [
        { rotate: 180, flexBasis: "100%" },
        { rotate: 0, flexBasis: "100%" },
    ],
    3: [
        { rotate: 90, flexBasis: "50%", counter: "body1" },
        { rotate: -90, flexBasis: "50%", counter: "body1" },
        { rotate: 0, flexBasis: "100%" },
    ],
    4: [
        { rotate: 90, flexBasis: "50%", counter: "body1" },
        { rotate: -90, flexBasis: "50%", counter: "body1" },
        { rotate: 90, flexBasis: "50%", counter: "body1" },
        { rotate: -90, flexBasis: "50%", counter: "body1" },
    ],
    5: [
        { rotate: 180, flexBasis: "100%" },
        { rotate: 90, flexBasis: "50%", counter: "body2" },
        { rotate: -90, flexBasis: "50%", counter: "body2" },
        { rotate: 90, flexBasis: "50%", counter: "body2" },
        { rotate: -90, flexBasis: "50%", counter: "body2" },
    ],
    6: [
        { rotate: 90, flexBasis: "50%", counter: "body2" },
        { rotate: -90, flexBasis: "50%", counter: "body2" },
        { rotate: 90, flexBasis: "50%", counter: "body2" },
        { rotate: -90, flexBasis: "50%", counter: "body2" },
        { rotate: 90, flexBasis: "50%", counter: "body2" },
        { rotate: -90, flexBasis: "50%", counter: "body2" },
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
    const { startingPlayer } = state;
    const activeValue = activeCounter ? counters[activeCounter]! : life;
    const activeDiff = activeValue - debouncedValue;

    // Reset debounce after counter changes
    React.useEffect(
        () => setDebouncedValue(activeValue),
        // eslint-disable-next-line
        [activeCounter]
    );

    // Reset state after restart
    React.useEffect(
        () => {
            setDebouncedValue(activeValue);
            setActiveCounter(undefined);
        },
        // eslint-disable-next-line
        [startingPlayer]
    );

    const debouncedSet = React.useCallback(debounce(setDebouncedValue, 1000), []);
    const setCounter = (value: number) => {
        debouncedSet(activeValue + value);
        dispatch({ type: "SetPlayerCounter", player, value, counter: activeCounter });
    };

    const clearStartingPlayer = () => dispatch({ type: "SetStartingPlayer", player: null });

    const isMobile = useMediaQuery(MainTheme.breakpoints.down("xs"));
    const valueTextVariant = React.useMemo(() => (isMobile ? "h2" : "h1"), [isMobile]);

    const { rotate, flexBasis, counter } = PlayerTransforms[state.players.length as PlayerCount][player];
    return (
        <Wrapper ref={ref} flexBasis={flexBasis} players={state.players.length}>
            <Body rotate={rotate} w={width} h={height} flexGrow={1} flexDirection="column" justifyContent="center">
                <Fade in={player === startingPlayer}>
                    <StartingPlayerOverlay onClick={clearStartingPlayer} />
                </Fade>
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
                        <Flex key={c} justifyContent="center" alignItems="center">
                            <IconButton
                                styled={{
                                    selected: activeCounter === c,
                                    tight: counter === "body2",
                                }}
                                onClick={() => setActiveCounter(activeCounter === c ? undefined : (c as CounterVariant))}
                            >
                                <SymbolTypography variant={counter ?? "h6"} text={`${counters[c as CounterVariant]} ${c}`} />
                            </IconButton>
                        </Flex>
                    ))}
                </Flex>
            </Body>
        </Wrapper>
    );
};
export default PlayerCard;
