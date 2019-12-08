import React from "react";
import * as Scry from "scryfall-sdk";
import { State } from "../../State";
import CardPreview from "../CardPreview";
import { Grid } from "@material-ui/core";
import { AppletPaper } from "../Styled/Grid";
import GoogleApi from "../../Utility/GoogleApi";

export type PreviewStyle = "Minimal" | "Checklist" | "Images" | "Full";

type Props = {
    deckName: string;
};

const DeckPreview = ({ deckName }: Props) => {
    const [state, dispatch] = React.useContext(State);
    const deck = state.decks[deckName];

    const [style, setStyle] = React.useState<PreviewStyle>("Minimal");

    React.useEffect(() => {
        const missingCards = deck.filter(card => !state.cardList[card.name]);
        console.log({ deck, missingCards });
        Scry.Cards.collection(
            ...missingCards.map(card => (card.set ? Scry.CardIdentifier.byName(card.name, card.set) : Scry.CardIdentifier.byName(card.name)))
        ).on("data", (card: any) => dispatch({ type: "AddCard", card }));
    }, [deck, dispatch, state.cardList]);

    const exportCollection = async () => {
        console.log(await GoogleApi.getFileContents({ id: state.files.collection }));
    };

    return (
        <Grid item xs={12} md={6}>
            <AppletPaper>
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
                            {deck.map((card, i) => (
                                <CardPreview style={style} key={i} {...card} />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        {deck.map((card, i) => (
                            <CardPreview style={style} key={i} {...card} />
                        ))}
                    </div>
                )}
            </AppletPaper>
        </Grid>
    );
};

export default DeckPreview;