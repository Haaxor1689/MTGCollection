import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import copy from "clipboard-copy";
import React from "react";
import * as Scry from "scryfall-sdk";
import { DeckName, State } from "../../State";
import GoogleApi from "../../Utility/GoogleApi";
import CollectionPreview from "../Display/CollectionPreview";
import { AppletActions, AppletPaper, FlexCol, Title } from "../Styled/Grid";
import { ClipboardIcon, CompressIcon, ExpandIcon } from "../Styled/Icons";
import TooltipButton from "../Styled/TooltipButton";
import styled from "../Styled/Theme";

const ExportRow = styled(FlexCol)`
    display: flex;
    align-items: center;
    margin-bottom: ${p => p.theme.spacing(1)}px;

    & .MuiDialogContentText-root {
        flex-grow: 1;
        margin-bottom: 0;
    }
`;

type Props = {
    deckName: string;
};

const DeckPreview = ({ deckName }: Props) => {
    const [state, dispatch] = React.useContext(State);
    const deck = state.decks[deckName];

    const [expanded, setExpanded] = React.useState(true);

    const [exportOpened, setExportOpened] = React.useState(false);
    const [exportText, setExportText] = React.useState("");

    React.useEffect(() => {
        const missingCards = deck.cards.filter(card => !state.cardList[card.name]);
        Scry.Cards.collection(
            ...missingCards.map(card => (card.set ? Scry.CardIdentifier.byName(card.name, card.set) : Scry.CardIdentifier.byName(card.name)))
        ).on("data", (card: any) => dispatch({ type: "AddCard", card }));
    }, [deck, dispatch, state.cardList]);

    const closePreview = () => {
        dispatch({ type: "SelectDeck", name: null });
    };

    const toggleExpanded = () => {
        setExpanded(e => !e);
    };

    const onDeleteDeck = () => {
        GoogleApi.deleteDeck(dispatch, { name: deckName, id: state.files[deckName] });
    };

    const onExportOpen = () => {
        GoogleApi.getFileContents({ id: state.files[deckName] }).then(exported => {
            setExportText(exported);
            setExportOpened(true);
        });
    };

    const onExportClose = () => {
        setExportOpened(false);
    };

    return (
        <Grid item xs={12} md={expanded ? 6 : 4}>
            <AppletPaper>
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Title>Deck preview</Title>
                    </Grid>
                    <Grid item>
                        <TooltipButton title={expanded ? "Compress" : "Expand"} size="small" onClick={toggleExpanded}>
                            {expanded ? <CompressIcon /> : <ExpandIcon />}
                        </TooltipButton>
                        <TooltipButton title="Close preview" size="small" onClick={closePreview}>
                            <CloseIcon />
                        </TooltipButton>
                    </Grid>
                </Grid>
                <FlexCol>
                    <CollectionPreview cards={deck.cards as any[]} />
                </FlexCol>
                <AppletActions>
                    <TooltipButton title="Export deck" onClick={onExportOpen}>
                        <GetAppIcon />
                    </TooltipButton>
                    {deckName !== DeckName.Collection && deckName !== DeckName.Wishlist && (
                        <TooltipButton title="Delete deck" onClick={onDeleteDeck}>
                            <DeleteIcon />
                        </TooltipButton>
                    )}
                </AppletActions>
                <Dialog open={exportOpened} onClose={onExportClose} aria-labelledby="export-deck-dialog" fullWidth maxWidth="md">
                    <DialogTitle id="import-deck-dialog">Export</DialogTitle>
                    <DialogContent>
                        <ExportRow>
                            <DialogContentText>Copy exported text below.</DialogContentText>
                            <TooltipButton title="Copy to clipboard" onClick={() => copy(exportText)}>
                                <ClipboardIcon />
                            </TooltipButton>
                        </ExportRow>
                        <TextField
                            label="Export"
                            multiline
                            rows="15"
                            fullWidth
                            variant="outlined"
                            value={exportText}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </AppletPaper>
        </Grid>
    );
};

export default DeckPreview;
