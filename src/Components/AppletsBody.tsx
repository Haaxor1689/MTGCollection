import { Grid, Paper, Tab, Tabs } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { State } from "../State";
import DeckAvatar from "./Drawer/DeckAvatar";
import AddDeck from "./Applets/AddDeck";
import CardSearch from "./Applets/CardSearch";
import DeckPreview from "./Applets/DeckPreview";

const AppletVariant: React.FC<{ tab: number }> = ({ tab }) => {
    const [state] = React.useContext(State);
    switch (tab) {
        case 0:
            return <AddDeck />;
        case 1:
            return <CardSearch />;
        default:
            return state.selectedDeck ? <DeckPreview /> : null;
    }
};

const AppletsBody: React.FC = () => {
    const [state] = React.useContext(State);

    const [tab, setTab] = React.useState<number>(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setTab(newValue);

    return (
        <Grid item>
            <Paper>
                <Tabs value={tab} onChange={handleChange}>
                    <Tab icon={<AddCircleOutlineIcon />} />
                    <Tab icon={<SearchIcon />} />
                    {state.selectedDeck && <Tab label={state.selectedDeck} icon={<DeckAvatar deck={state.decks[state.selectedDeck]} />} />}
                </Tabs>
                <AppletVariant tab={tab} />
            </Paper>
        </Grid>
    );
};
export default AppletsBody;
