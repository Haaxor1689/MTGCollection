import { Box, Button, ButtonGroup, Typography } from "@material-ui/core";
import React from "react";
import { Flex } from "reflexbox";
import { Counters, CounterVariant, LifecounterState } from "../../../State/Lifecounter";
import SymbolIcon from "../../Styled/SymbolIcon";
import styled from "../../Styled/Theme";

const SymbolButton = styled(Button)`
    padding: 5px 5px;
    padding-bottom: 7px;
    min-width: 0;
`;

type Props = {
    player: number;
};

const PlayerSettings: React.FC<Props> = ({ player }) => {
    const [state, dispatch] = React.useContext(LifecounterState);
    const { name, counters } = state.players[player];

    const toggleCounter = (counter: CounterVariant) => dispatch({ type: "ToggleCounter", player, counter });

    return (
        <Flex width={["33%", "16%"]} flexDirection="column" alignItems="center" my={2}>
            <Typography>{name}</Typography>
            <Box mt={1}>
                <ButtonGroup orientation="vertical">
                    {Counters.slice(0, 5).map(c => (
                        <SymbolButton key={c} onClick={() => toggleCounter(c)} variant={counters[c] !== undefined ? "contained" : undefined}>
                            <SymbolIcon symbol={c} />
                        </SymbolButton>
                    ))}
                </ButtonGroup>
                <ButtonGroup orientation="vertical">
                    {Counters.slice(5).map(c => (
                        <SymbolButton key={c} onClick={() => toggleCounter(c)} variant={counters[c] !== undefined ? "contained" : undefined}>
                            <SymbolIcon symbol={c} />
                        </SymbolButton>
                    ))}
                </ButtonGroup>
            </Box>
        </Flex>
    );
};
export default PlayerSettings;
