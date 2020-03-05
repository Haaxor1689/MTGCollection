import { Avatar, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import React from "react";
import { useHistory } from "react-router";
import { RouteNames } from "../../Routes/Routes";
import { AppState } from "../../State";
import GoogleApi from "../../Utility/GoogleApi";
import Scry from "../../Utility/Scry";
import useThunk from "../../Utility/useThunk";
import CardNameAutocomplete from "../Styled/CardNameAutocomplete";
import { AppletActions, AppletContent, FlexCol, Title } from "../Styled/Grid";
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
    const history = useHistory();
    const [state] = React.useContext(AppState);
    const createNewDeck = useThunk(AppState, GoogleApi.createNewDeck);

    const [importText, setImportText] = React.useState<string>("");
    const [deckName, setDeckName] = React.useState<string>("");
    const [open, setOpen] = React.useState(false);
    const [invalidName, setInvalidName] = React.useState<string | null>(null);

    const [previewUrl, setPreviewUrl] = React.useState<string>("");

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImport = () => {
        createNewDeck({ name: deckName, fileContent: importText, previewUrl });
        history.push(RouteNames.Deck(encodeURIComponent(deckName)));
    };

    const validateName = (name: string) => {
        setDeckName(name);
        if (name === "") {
            setInvalidName("Deck name can't be empty");
            return;
        }
        if (name.indexOf("%") >= 0) {
            setInvalidName("Deck name can't contain '%'");
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

    // eslint-disable-next-line
    React.useEffect(() => validateName(""), []);

    return (
        <AppletContent>
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
        </AppletContent>
    );
};

export default AddDeck;
