import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import React from "react";
import { State } from "../../State";
import GoogleApi from "../../Utility/GoogleApi";
import { AppletActions, AppletPaper, FlexCol, Title } from "../Styled/Grid";

const AddDeck = () => {
    const [state, dispatch] = React.useContext(State);

    const [importText, setImportText] = React.useState<string>("");
    const [deckName, setDeckName] = React.useState<string>("");
    const [open, setOpen] = React.useState(false);
    const [invalidName, setInvalidName] = React.useState<boolean>(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImport = () => {
        setOpen(false);
        if (deckName === "" || Object.keys(state.decks).find(n => n === deckName)) {
            setInvalidName(true);
            return;
        }
        GoogleApi.createNewDeck(dispatch, { name: deckName, fileContent: importText });
        setImportText("");
        setDeckName("");
        setInvalidName(false);
    };

    return (
        <Grid item xs={12} md={3}>
            <AppletPaper>
                <Title>Add deck</Title>
                <FlexCol>
                    <TextField
                        label="Deck name"
                        variant="outlined"
                        error={invalidName}
                        helperText={
                            deckName === ""
                                ? "Deck name can't be empty"
                                : Object.keys(state.decks).find(n => n === deckName)
                                    ? "Deck with this name already exists"
                                    : ""
                        }
                        value={deckName}
                        onChange={e => setDeckName(e.target.value)}
                    />
                </FlexCol>
                <AppletActions>
                    <ButtonGroup size="small">
                        <Button onClick={handleClickOpen}>Import</Button>
                        <Button color="primary" onClick={handleImport}>
                            Create
                        </Button>
                    </ButtonGroup>
                </AppletActions>
                <Dialog open={open} onClose={handleClose} aria-labelledby="import-deck-dialog" fullWidth maxWidth="md">
                    <DialogTitle id="import-deck-dialog">Import</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Paste exported deck below.</DialogContentText>
                        <TextField
                            autoFocus
                            fullWidth
                            label="Import"
                            multiline
                            rows="15"
                            variant="outlined"
                            value={importText}
                            onChange={e => setImportText(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleImport} color="primary">
                            Import
                        </Button>
                    </DialogActions>
                </Dialog>
            </AppletPaper>
        </Grid>
    );
};

export default AddDeck;
