import React from "react";
import { isNullOrUndefined } from "util";
import { initialState, State } from "../State";
import { reducer } from "../State/Reducers";
import CollectionParser from "../Utility/CollectionParser";
import GoogleApi, { GoogleProfile } from "../Utility/GoogleApi";
import DeckPreview from "./DeckPreview";
import { ImportCards } from "./ImportCards";

const Home: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const [profile, setProfile] = React.useState<GoogleProfile>();

    const handleSignoutClick = () => {
        GoogleApi.signOut();
        setProfile(undefined);
    };

    const importCollection = (value: string) => {
        GoogleApi.updateFile({ id: state.files.collection, fileContent: value });
        dispatch({ type: "UpdateDeck", name: "collection", cardList: CollectionParser.parse(value) });
    };

    const exportCollection = async () => {
        console.log(await GoogleApi.getFileContents({ id: state.files.collection }));
    };

    React.useEffect(() => {
        setProfile(GoogleApi.getProfile());
        GoogleApi.prepareAppData()(dispatch);
    }, []);

    return (
        <State.Provider value={[state, dispatch]}>
            <button onClick={handleSignoutClick}>Sign Out</button>
            {!isNullOrUndefined(profile) && (
                <div>
                    <img src={profile.getImageUrl()} alt="Profile" />
                    <div>Welcome back, {profile.getGivenName()}</div>
                </div>
            )}
            <ImportCards onImport={importCollection} />
            <button onClick={exportCollection}>Export collection</button>
            <DeckPreview deckName="collection" />
        </State.Provider>
    );
};

export default Home;
