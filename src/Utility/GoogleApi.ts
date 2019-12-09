/* global gapi */
import React from "react";
import { DeckName } from "../State";
import { Action } from "../State/Actions";
import CollectionParser from "./CollectionParser";

const GoogleApiInit = {
    apiKey: process.env.REACT_APP_API_KEY,
    clientId: process.env.REACT_APP_CLIENT_ID,
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
    scope: "profile https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file",
};

const initClient = (onUpdateStatus: (isSignedIn: boolean) => void) => {
    gapi.load("client:auth2", () => {
        gapi.client.init(GoogleApiInit).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(onUpdateStatus);
            onUpdateStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }, console.error);
    });
};

const prepareAppData = () => async (dispatch: React.Dispatch<Action>) => {
    var response = await gapi.client.drive.files.list({
        spaces: "appDataFolder",
        fields: "nextPageToken, files(id, name)",
    });

    const collectionFile = response.result?.files?.find(f => f.name === `${DeckName.Collection}.txt`);
    if (!collectionFile) {
        console.info("Creating collection...");
        createNewDeck(dispatch, { name: DeckName.Collection });
    } else {
        console.info("Loading collection...");
        dispatch({ type: "CreateDeck", name: DeckName.Collection, link: collectionFile.id! });
        dispatch({ type: "UpdateDeck", name: DeckName.Collection, cards: CollectionParser.parse(await getFileContents({ id: collectionFile.id! })) });
    }

    const wishlistFile = response.result?.files?.find(f => f.name === `${DeckName.Wishlist}.txt`);
    if (!wishlistFile) {
        console.info("Creating wishlist...");
        createNewDeck(dispatch, { name: DeckName.Wishlist });
    } else {
        console.info("Loading wishlist...");
        dispatch({ type: "CreateDeck", name: DeckName.Wishlist, link: wishlistFile.id! });
        dispatch({ type: "UpdateDeck", name: DeckName.Wishlist, cards: CollectionParser.parse(await getFileContents({ id: wishlistFile.id! })) });
    }
};

const createNewDeck = async (dispatch: React.Dispatch<Action>, { name, fileContent }: { name: string; fileContent?: string }) => {
    dispatch({
        type: "CreateDeck",
        name,
        link: await createNewFile({
            name: `${name}.txt`,
            fileContent,
        }),
        cards: CollectionParser.parse(fileContent),
    });
};

const createNewFile = async ({ name, fileContent, folder }: { name: string; fileContent?: string; folder?: string[] }): Promise<string> => {
    const file = new Blob([fileContent ?? ""], { type: "text/plain" });
    const metadata = {
        name,
        mimeType: "text/plain",
        parents: ["appDataFolder", ...(folder ?? [])],
    };

    const accessToken = gapi.auth.getToken().access_token;
    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", file);

    const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id", {
        method: "POST",
        headers: new Headers({ Authorization: "Bearer " + accessToken }),
        body: form,
    });
    const val = await res.json();
    return val.id;
};

const updateFile = async ({ id, fileContent }: { id: string; fileContent: string }) => {
    const file = new Blob([fileContent], { type: "text/plain" });

    const accessToken = gapi.auth.getToken().access_token;
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media&fields=id`, {
        method: "PATCH",
        headers: new Headers({ Authorization: "Bearer " + accessToken }),
        body: form,
    });
    const val = await res.json();
    return val.id;
};

const getFileContents = async ({ id }: { id: string }) => {
    const res = await gapi.client.drive.files.get({
        fileId: id,
        alt: "media",
    });
    const lines = res.body.split("\n");
    const text = lines.slice(4, lines.length - 2).join("\n");
    return text;
};

const getProfile = () => {
    return gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile();
};

const signIn = () => gapi.auth2.getAuthInstance().signIn();
const signOut = () => gapi.auth2.getAuthInstance().signOut();

export type GoogleProfile = gapi.auth2.BasicProfile;

const GoogleApi = {
    initClient,
    getProfile,
    signIn,
    signOut,
    prepareAppData,
    createNewDeck,
    createNewFile,
    updateFile,
    getFileContents,
};
export default GoogleApi;
