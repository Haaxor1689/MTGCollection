import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import SaveIcon from "@material-ui/icons/Save";
import copy from "clipboard-copy";
import React from "react";
import { useHistory, useParams } from "react-router";
import * as Scry from "scryfall-sdk";
import { DeckCard, DeckName, getDeckName, State } from "../../State";
import CollectionParser from "../../Utility/CollectionParser";
import GoogleApi from "../../Utility/GoogleApi";
import CollectionPreview, { PreviewStyle, SortByOptions, SortOrderOptions } from "../Previews/CollectionPreview";
import PreviewStyleToggle from "../Previews/Common/PreviewStyleToggle";
import ShowGroupsToggle from "../Previews/Common/ShowGroupsToggle";
import SortToggle from "../Previews/Common/SortToggle";
import { AppletActions, AppletContent, FlexCol, Title } from "../Styled/Grid";
import { ClipboardIcon, CompressIcon, ExpandIcon } from "../Styled/Icons";
import styled, { css } from "../Styled/Theme";
import TooltipButton from "../Styled/TooltipButton";

const SectionRow = styled.div<{ scrollable: boolean }>`
    margin-bottom: ${p => p.theme.spacing(2)}px;
    ${p =>
        p.scrollable &&
        css`
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
        `}
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

const AppletBackground = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 75%;
    z-index: 0;

    & img {
        width: 100%;
    }

    &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        display: inline-block;
        background-image: radial-gradient(
            ellipse at top 35% right 35%,
            ${p => fade(p.theme.palette.background.paper, 0.8)} 0%,
            ${p => p.theme.palette.background.paper} 70%
        );
    }
`;

const Body = styled.div`
    z-index: 0;
    display: flex;
    flex-direction: column;
`;

type Params = {
    deckName: string;
};

const DeckPreview: React.FC = () => {
    let { deckName } = useParams<Params>();
    deckName = decodeURIComponent(deckName);

    const history = useHistory();
    const [state, dispatch] = React.useContext(State);
    const deck = state.decks[deckName];

    const [expanded, setExpanded] = React.useState(true);
    const [exportOpened, setExportOpened] = React.useState(false);
    const [style, setStyle] = React.useState<PreviewStyle>("List");
    const [sortBy, setSortBy] = React.useState<SortByOptions>("Cmc");
    const [sortOrder, setSortOrder] = React.useState<SortOrderOptions>("Asc");
    const [showGroups, setShowGroups] = React.useState(false);

    React.useEffect(() => {
        dispatch({ type: "SelectDeck", name: deckName });
        const missingCards = Object.values(deck?.cards ?? {})
            .reduce((prev, val) => [...prev, ...Object.values(val)], [] as DeckCard[])
            .filter(card => !state.cardList[card.name]);
        Scry.Cards.collection(...missingCards.map(card => Scry.CardIdentifier.byName(card.name))).on("data", (card: any) =>
            dispatch({ type: "AddCard", card })
        );
    }, [deckName, deck]);

    const closePreview = () => dispatch({ type: "SelectDeck", name: null });
    const toggleExpanded = () => setExpanded(e => !e);
    const onDeleteDeck = () => {
        history.push("/");
        GoogleApi.deleteDeck(dispatch, { name: deckName, id: state.files[deckName] });
    };
    const onSaveChanges = () =>
        GoogleApi.updateFile({ id: state.files[deckName], fileContent: CollectionParser.deserialize(deck.cards) }).then(() =>
            dispatch({ type: "UpdateDeck", name: deckName, isDirty: false })
        );
    const onExportOpen = () => setExportOpened(true);
    const onExportClose = () => setExportOpened(false);

    if (deck === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <AppletContent>
            <AppletBackground>
                <img src={deck.previewUrl} />
            </AppletBackground>
            <Body>
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Title>{getDeckName(deck.name)}</Title>
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
                        <SectionRow key={sectionName} scrollable={expanded && style === "List"}>
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
                    {deck.isDirty && (
                        <TooltipButton title="Save changes" onClick={onSaveChanges} background="primary">
                            <SaveIcon />
                        </TooltipButton>
                    )}
                </AppletActions>
            </Body>
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
        </AppletContent>
    );
};

export default DeckPreview;
