import React from "react";
import { State } from "../State";
import CollectionParser from "../Utility/CollectionParser";
import GoogleApi from "../Utility/GoogleApi";
import DeckPreview from "./DeckPreview";
import { ImportCards } from "./ImportCards";

const Home: React.FC = () => {
    const [state, dispatch] = React.useContext(State);

    const importCollection = (value: string) => {
        GoogleApi.updateFile({ id: state.files.collection, fileContent: value });
        dispatch({ type: "UpdateDeck", name: "collection", cardList: CollectionParser.parse(value) });
    };

    const exportCollection = async () => {
        console.log(await GoogleApi.getFileContents({ id: state.files.collection }));
    };

    return (
        <>
            <ImportCards onImport={importCollection} />
            <button onClick={exportCollection}>Export collection</button>
            <DeckPreview deckName="collection" />
        </>
    );
};

export default Home;
