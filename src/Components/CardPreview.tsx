import { DeckCard, State } from "../State";
import React from "react";
import { PreviewStyle } from "./Applets/DeckPreview";
import Scry from "../Utility/Scry";

type Props = DeckCard & {
    style: PreviewStyle;
};

const CardPreview = ({ style, ...card }: Props) => {
    const [state] = React.useContext(State);
    const scryCard = state.cardList[card.name];

    switch (style) {
        case "Minimal":
            return (
                <tr title={card.comment}>
                    <td>{card.amount}x</td>
                    <td>
                        {card.isFoil && <div>(Foil)</div>}
                        {card.name}
                    </td>
                    <td>{card.set ?? "-"}</td>
                </tr>
            );
        case "Checklist":
            return (
                <tr>
                    <td>{card.amount}x</td>
                    <td>
                        {card.isFoil && <div>(Foil)</div>}
                        {card.name}
                    </td>
                    <td>{scryCard ? scryCard.mana_cost : "???"}</td>
                    <td>{card.set}</td>
                </tr>
            );
        case "Images":
            return <img title={card.name} alt={card.name} src={scryCard && (Scry.getImage(scryCard, "small") ?? undefined)} />;
        case "Full":
            return <div>PLACEHOLDER</div>;
    }
};

export default CardPreview;
