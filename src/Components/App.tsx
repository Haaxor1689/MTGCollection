/* global gapi */
import React from "react";

import { ImportCards } from "./ImportCards";
import { initialState, State } from "../State";
import { reducer } from "../State/Reducers";
import GoogleApi from "../Utility/GoogleApi";
import CollectionParser from "../Utility/CollectionParser";
import DeckPreview from "./DeckPreveiw";

const App: React.FunctionComponent = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const [signedIn, setSignedIn] = React.useState(false);
    const [basicProfile, setBasicProfile] = React.useState<gapi.auth2.BasicProfile>();

    const handleAuthClick = () => {
        gapi.auth2.getAuthInstance().signIn();
    };

    const handleSignoutClick = () => {
        gapi.auth2.getAuthInstance().signOut();
        setBasicProfile(undefined);
    };

    React.useEffect(() => {
        GoogleApi.initClient(async (isSignedIn: boolean) => {
            setSignedIn(isSignedIn);
            if (!isSignedIn) {
                return;
            }
            setBasicProfile(
                gapi.auth2
                    .getAuthInstance()
                    .currentUser.get()
                    .getBasicProfile()
            );
            GoogleApi.prepareAppData()(dispatch);
        });
    }, []);

    const importCollection = (value: string) => {
        GoogleApi.updateFile({ id: state.files.collection, fileContent: value });
        dispatch({ type: "UpdateDeck", name: "collection", cardList: CollectionParser.parse(value) });
    };

    const exportCollection = async () => {
        console.log(await GoogleApi.getFileContents({ id: state.files.collection }));
    };

    return signedIn ? (
        <State.Provider value={[state, dispatch]}>
            <button onClick={handleSignoutClick}>Sign Out</button>
            {basicProfile !== undefined && (
                <div>
                    <img src={basicProfile.getImageUrl()} alt="Profile" />
                    <div>Welcome back, {basicProfile.getGivenName()}</div>
                </div>
            )}
            <ImportCards onImport={importCollection} />
            <button onClick={exportCollection}>Export collection</button>
            <DeckPreview deckName="collection" />
        </State.Provider>
    ) : (
        <button onClick={handleAuthClick}>Sign in to google</button>
    );
};

export default App;
