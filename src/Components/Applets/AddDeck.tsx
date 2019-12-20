import { Avatar, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import React from "react";
import { State } from "../../State";
import GoogleApi from "../../Utility/GoogleApi";
import Scry from "../../Utility/Scry";
import CardNameAutocomplete from "../Styled/CardNameAutocomplete";
import { AppletActions, AppletPaper, FlexCol, Title } from "../Styled/Grid";
import styled from "../Styled/Theme";

const PreviewRow = styled.div`
    display: flex;
    margin-top: ${p => p.theme.spacing(1)}px;
    align-items: center;

    & .MuiAutocomplete-root {
        flex-grow: 1;
        margin-right: ${p => p.theme.spacing(1)}px;
    }
`;

const AddDeck: React.FC = () => {
    const [state, dispatch] = React.useContext(State);

    const [importText, setImportText] = React.useState<string>("");
    const [deckName, setDeckName] = React.useState<string>("");
    const [open, setOpen] = React.useState(false);
    const [invalidName, setInvalidName] = React.useState<string | null>(null);

    const [previewUrl, setPreviewUrl] = React.useState<string>("");

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImport = () => {
        setOpen(false);
        GoogleApi.createNewDeck(dispatch, { name: deckName, fileContent: importText, previewUrl });
        setImportText("");
        validateName("");
        setPreviewUrl("");
    };

    const validateName = (name: string) => {
        setDeckName(name);
        if (name === "") {
            setInvalidName("Deck name can't be empty");
            return;
        }
        if (state.decks[name]) {
            setInvalidName("Deck with this name already exists");
            return;
        }
        setInvalidName(null);
    };

    const updatePreview = (name: string) => {
        if (!name) {
            setPreviewUrl("");
            return;
        }
        Scry.Cards.Named(name).then(card => {
            setPreviewUrl(Scry.getImage(card, "art_crop") ?? "");
        });
    };

    React.useEffect(() => validateName(""), []);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <AppletPaper>
                <Title>Add deck</Title>
                <FlexCol>
                    <TextField
                        label="Deck name"
                        variant="outlined"
                        error={!!invalidName}
                        helperText={invalidName}
                        value={deckName}
                        onChange={e => validateName(e.target.value)}
                        fullWidth
                    />
                    <PreviewRow>
                        <CardNameAutocomplete label="Preview card" onNameSelect={updatePreview} />
                        <Avatar alt="Preview icon" src={previewUrl}>
                            <CollectionsIcon />
                        </Avatar>
                    </PreviewRow>
                </FlexCol>
                <AppletActions>
                    <ButtonGroup size="small">
                        <Button disabled={!!invalidName} onClick={handleClickOpen}>
                            Import
                        </Button>
                        <Button disabled={!!invalidName} color="primary" onClick={handleImport}>
                            Create empty
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
