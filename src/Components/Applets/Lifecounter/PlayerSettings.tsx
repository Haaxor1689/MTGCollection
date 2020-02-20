import { Button, ButtonGroup, TextField } from "@material-ui/core";
import React from "react";
import { Box, Flex } from "reflexbox";
import { Counters, CounterVariant, LifecounterState } from "../../../State/Lifecounter";
import SymbolTypography from "../../Styled/SymbolTypography";
import styled from "../../Styled/Theme";

const SymbolButton = styled(Button)`
    padding: 7px;
    padding-bottom: 3px;
    min-width: 0;
`;

const CenteredTextField = styled(TextField)`
    & .MuiInputBase-input {
        text-align: center;
    }
`;

type Props = {
    player: number;
};

const PlayerSettings: React.FC<Props> = ({ player }) => {
    const [state, dispatch] = React.useContext(LifecounterState);
    const { name, counters } = state.players[player];

    const toggleCounter = (counter: CounterVariant) => dispatch({ type: "ToggleCounter", player, counter });

    return (
        <Flex width={["100%", "50%", "50%", "33%"]} flexDirection="column" alignItems="center" my={2}>
            <Box width={180} pb={2}>
                <CenteredTextField value={name} onChange={e => dispatch({ type: "SetName", player, name: e.target.value })} fullWidth />
            </Box>
            <ButtonGroup>
                {Counters.slice(0, 5).map(c => (
                    <SymbolButton key={c} onClick={() => toggleCounter(c)} variant={counters[c] !== undefined ? "contained" : undefined}>
                        <SymbolTypography text={c} variant="h5" />
                    </SymbolButton>
                ))}
            </ButtonGroup>
            <ButtonGroup>
                {Counters.slice(5).map(c => (
                    <SymbolButton key={c} onClick={() => toggleCounter(c)} variant={counters[c] !== undefined ? "contained" : undefined}>
                        <SymbolTypography text={c} variant="h5" />
                    </SymbolButton>
                ))}
            </ButtonGroup>
        </Flex>
    );
};
export default PlayerSettings;
