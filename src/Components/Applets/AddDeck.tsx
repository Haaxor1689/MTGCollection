import { Button, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import React from "react";
import { State } from "../../State";
import CollectionParser from "../../Utility/CollectionParser";
import GoogleApi from "../../Utility/GoogleApi";
import { AppletPaper } from "../Styled/Grid";

const AddDeck = () => {
    const [state, dispatch] = React.useContext(State);

    const [value, setValue] = React.useState<string>("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImport = () => {
        setOpen(false);
        GoogleApi.updateFile({ id: state.files.collection, fileContent: value });
        dispatch({ type: "UpdateDeck", name: "collection", cardList: CollectionParser.parse(value) });
    };

    return (
        <Grid item xs={12} md={3}>
            <AppletPaper>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Import new deck
                </Button>
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
                            value={value}
                            onChange={e => setValue(e.target.value)}
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
