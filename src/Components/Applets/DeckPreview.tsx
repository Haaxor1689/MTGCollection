import { Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import * as Scry from "scryfall-sdk";
import { DeckName, State } from "../../State";
import GoogleApi from "../../Utility/GoogleApi";
import CardPreview from "../CardPreview";
import { AppletActions, AppletPaper, FlexCol, Title } from "../Styled/Grid";
import { CompressIcon, ExpandIcon } from "../Styled/Icons";
import TooltipButton from "../Styled/TooltipButton";

export type PreviewStyle = "Minimal" | "Checklist" | "Images" | "Full";

type Props = {
    deckName: string;
};

const DeckPreview = ({ deckName }: Props) => {
    const [state, dispatch] = React.useContext(State);
    const deck = state.decks[deckName];

    const [style, setStyle] = React.useState<PreviewStyle>("Minimal");
    const [expanded, setExpanded] = React.useState(true);

    React.useEffect(() => {
        const missingCards = deck.cards.filter(card => !state.cardList[card.name]);
        Scry.Cards.collection(
            ...missingCards.map(card => (card.set ? Scry.CardIdentifier.byName(card.name, card.set) : Scry.CardIdentifier.byName(card.name)))
        ).on("data", (card: any) => dispatch({ type: "AddCard", card }));
    }, [deck, dispatch, state.cardList]);

    const exportCollection = async () => {
        console.log(await GoogleApi.getFileContents({ id: state.files.collection }));
    };

    const closePreview = () => {
        dispatch({ type: "SelectDeck", name: null });
    };

    const toggleExpanded = () => {
        setExpanded(e => !e);
    };

    const onDeleteDeck = () => {
        GoogleApi.deleteDeck(dispatch, { name: deckName, id: state.files[deckName] });
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
                    <div>Deck: {deckName}</div>
                    <button onClick={exportCollection}>Export collection</button>
                    <div>
                        <div>Style:</div>
                        <button disabled={style === "Minimal"} onClick={() => setStyle("Minimal")}>
                            Minimal
                        </button>
                        <button disabled={style === "Checklist"} onClick={() => setStyle("Checklist")}>
                            Checklist
                        </button>
                        <button disabled={style === "Images"} onClick={() => setStyle("Images")}>
                            Images
                        </button>
                        <button disabled={style === "Full"} onClick={() => setStyle("Full")}>
                            Full
                        </button>
                    </div>
                    {style === "Minimal" || style === "Checklist" ? (
                        <table>
                            {style === "Minimal" && (
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Card name</th>
                                        <th>Set</th>
                                    </tr>
                                </thead>
                            )}
                            {style === "Checklist" && (
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Card name</th>
                                        <th>Mana cost</th>
                                        <th>Set</th>
                                    </tr>
                                </thead>
                            )}
                            <tbody>
                                {deck.cards.map((card, i) => (
                                    <CardPreview style={style} key={i} {...card} />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>
                            {deck.cards.map((card, i) => (
                                <CardPreview style={style} key={i} {...card} />
                            ))}
                        </div>
                    )}
                </FlexCol>
                <AppletActions>
                    {deckName !== DeckName.Collection && deckName !== DeckName.Wishlist && (
                        <TooltipButton title="Delete deck" onClick={onDeleteDeck}>
                            <DeleteIcon />
                        </TooltipButton>
                    )}
                </AppletActions>
            </AppletPaper>
        </Grid>
    );
};

export default DeckPreview;
