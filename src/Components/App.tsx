import React from "react";
import { isNullOrUndefined } from "util";
import { initialState, State } from "../State";
import { reducer } from "../State/Reducers";
import CollectionParser from "../Utility/CollectionParser";
import GoogleApi, { GoogleProfile } from "../Utility/GoogleApi";
import DeckPreview from "./DeckPreview";
import { ImportCards } from "./ImportCards";

const App: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const [signedIn, setSignedIn] = React.useState(false);
    const [profile, setProfile] = React.useState<GoogleProfile>();

    const handleSignoutClick = () => {
        GoogleApi.signOut();
        setProfile(undefined);
    };

    /**
     * Called at app init, sets Google API signin callback
     * info stored in React profile state
     */
    React.useEffect(() => {
        GoogleApi.initClient(async (isSignedIn: boolean) => {
            setSignedIn(isSignedIn);
            if (!isSignedIn) {
                return;
            }
            setProfile(GoogleApi.getProfile());
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
        // TODO: Main dashboard design
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
    ) : (
        // TODO: Login screen design
        <button onClick={GoogleApi.signIn}>Sign in to google</button>
    );
};

export default App;
