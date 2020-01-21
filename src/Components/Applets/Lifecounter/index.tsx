import { Slider, Typography } from "@material-ui/core";
import React from "react";
import { Box, Flex } from "reflexbox";
import { initialState, LifecounterState } from "../../../State/Lifecounter";
import { reducer } from "../../../State/Lifecounter/Reducers";
import { AppletContent, Title } from "../../Styled/Grid";
import styled from "../../Styled/Theme";
import PlayerCard from "./PlayerCard";

const SliderLabel = styled(Typography)`
    flex-basis: 20%;
`;

const SliderValue = styled(Typography)`
    flex-basis: 20px;
    text-align: right;
`;

const Lifecounter: React.FC = () => {
    const [playersCount, setPlayersCount] = React.useState(2);

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <LifecounterState.Provider value={[state, dispatch]}>
            <AppletContent>
                <Title>Lifecounter</Title>
                <Flex alignItems="center" justifyContent="space-between">
                    <SliderLabel>Players</SliderLabel>
                    <Box mx={3} flexGrow={1}>
                        <Slider
                            value={playersCount}
                            onChange={(e, v) => setPlayersCount(v as number)}
                            onChangeCommitted={() => dispatch({ type: "SetPlayers", count: playersCount })}
                            step={1}
                            min={2}
                            max={6}
                            marks
                            valueLabelDisplay="off"
                        />
                    </Box>
                    <SliderValue>{playersCount}</SliderValue>
                </Flex>
                <Flex alignItems="center" justifyContent="space-between">
                    <SliderLabel>Starting life</SliderLabel>
                    <Box mx={3} flexGrow={1}>
                        <Slider
                            value={state.startingLife}
                            onChange={(e, v) => dispatch({ type: "SetStartingLife", value: v as number })}
                            step={5}
                            min={10}
                            max={50}
                            marks
                            valueLabelDisplay="off"
                        />
                    </Box>
                    <SliderValue>{state.startingLife}</SliderValue>
                </Flex>
                <Flex justifyContent="center" flexWrap="wrap">
                    {state.players.map((_, i) => (
                        <PlayerCard key={i} player={i} />
                    ))}
                </Flex>
            </AppletContent>
        </LifecounterState.Provider>
    );
};
export default Lifecounter;
