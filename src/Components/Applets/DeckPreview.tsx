import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import copy from "clipboard-copy";
import React from "react";
import * as Scry from "scryfall-sdk";
import { DeckCard, DeckName, State } from "../../State";
import CollectionParser from "../../Utility/CollectionParser";
import GoogleApi from "../../Utility/GoogleApi";
import CollectionPreview, { PreviewStyle, SortByOptions, SortOrderOptions } from "../Display/CollectionPreview";
import PreviewStyleToggle from "../Display/PreviewStyleToggle";
import ShowGroupsToggle from "../Display/ShowGroupsToggle";
import SortToggle from "../Display/SortToggle";
import { AppletActions, AppletPaper, FlexCol, Title } from "../Styled/Grid";
import { ClipboardIcon, CompressIcon, ExpandIcon } from "../Styled/Icons";
import styled from "../Styled/Theme";
import TooltipButton from "../Styled/TooltipButton";

const SectionRow = styled.div`
    margin-bottom: ${p => p.theme.spacing(2)}px;
`;

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
    const [style, setStyle] = React.useState<PreviewStyle>("List");
    const [sortBy, setSortBy] = React.useState<SortByOptions>("Cmc");
    const [sortOrder, setSortOrder] = React.useState<SortOrderOptions>("Asc");
    const [showGroups, setShowGroups] = React.useState(false);

    React.useEffect(() => {
        const missingCards = Object.values(deck.cards)
            .reduce((prev, val) => [...prev, ...Object.values(val)], [] as DeckCard[])
            .filter(card => !state.cardList[card.name]);
        Scry.Cards.collection(...missingCards.map(card => Scry.CardIdentifier.byName(card.name))).on("data", (card: any) =>
            dispatch({ type: "AddCard", card })
        );
    }, [deckName]);

    const closePreview = () => dispatch({ type: "SelectDeck", name: null });
    const toggleExpanded = () => setExpanded(e => !e);
    const onDeleteDeck = () => GoogleApi.deleteDeck(dispatch, { name: deckName, id: state.files[deckName] });
    const onExportOpen = () => setExportOpened(true);
    const onExportClose = () => setExportOpened(false);

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
                <Grid container justify="space-between">
                    <SortToggle sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />
                    <ShowGroupsToggle show={showGroups} setShow={setShowGroups} />
                    <FlexCol />
                    {expanded && <PreviewStyleToggle style={style} onToggle={setStyle} />}
                </Grid>
                <FlexCol>
                    {Object.entries(deck.cards).map(([sectionName, cards]) => (
                        <SectionRow key={sectionName}>
                            <CollectionPreview
                                cards={Object.values(cards).map(c => ({ ...c, ...(state.cardList[c.name] ?? {}) })) as any}
                                style={expanded ? style : "Compressed"}
                                actions={deckName === DeckName.Wishlist ? "SearchWishlist" : "Deck"}
                                sortBy={sortBy}
                                sortOrder={sortOrder}
                                showGroups={showGroups}
                                deckName={deckName}
                                sectionName={sectionName}
                            />
                        </SectionRow>
                    ))}
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
                            <TooltipButton title="Copy to clipboard" onClick={() => copy(CollectionParser.deserialize(deck.cards))}>
                                <ClipboardIcon />
                            </TooltipButton>
                        </ExportRow>
                        <TextField
                            label="Export"
                            multiline
                            rows="15"
                            fullWidth
                            variant="outlined"
                            value={CollectionParser.deserialize(deck.cards)}
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
