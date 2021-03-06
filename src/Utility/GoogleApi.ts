/* global gapi */
import React from "react";
import { AppStateT, Deck, DeckName, DeckProps, SectionName } from "../State";
import { Action } from "../State/Actions";
import { downloadCards } from "../State/Thunks";
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

const prepareAppData = (dispatch: React.Dispatch<Action>, state: AppStateT) => async () => {
    var response = await gapi.client.drive.files.list({
        spaces: "appDataFolder",
        fields: "nextPageToken, files(id, name, appProperties)",
    });

    const collectionFile = response.result?.files?.find(f => f.appProperties?.name === DeckName.Collection);
    if (!collectionFile) {
        console.info("Creating collection...");
        await createNewDeck(dispatch, state)({ name: DeckName.Collection });
    } else {
        console.info("Loading collection...");
        await downloadDeck(dispatch, state)(DeckName.Collection, collectionFile);
    }

    const wishlistFile = response.result?.files?.find(f => f.appProperties?.name === DeckName.Wishlist);
    if (!wishlistFile) {
        console.info("Creating wishlist...");
        await createNewDeck(dispatch, state)({ name: DeckName.Wishlist });
    } else {
        console.info("Loading wishlist...");
        await downloadDeck(dispatch, state)(DeckName.Wishlist, wishlistFile);
    }

    const otherFiles = response.result?.files?.filter(f => f.appProperties?.name !== DeckName.Collection && f.appProperties?.name !== DeckName.Wishlist)!;
    for (let i = 0; i < otherFiles.length; i++) {
        const file = otherFiles[i];
        const name = file.appProperties?.name ?? file.name?.match(/(.*?)\.txt/)?.[0] ?? "unnamed";
        downloadDeck(dispatch, state)(name, file);
    }
};

const createNewFile = async ({
    name,
    props,
    fileContent,
    folder,
}: {
    name: string;
    props?: object;
    fileContent?: string;
    folder?: string[];
}): Promise<string> => {
    const file = new Blob([fileContent ?? ""], { type: "text/plain" });
    const metadata = {
        name,
        mimeType: "text/plain",
        appProperties: props ?? {},
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
    return res.body;
};

const deleteFile = async ({ id }: { id: string }) => gapi.client.drive.files.delete({ fileId: id });

const createNewDeck = (dispatch: React.Dispatch<Action>, state: AppStateT) => async ({
    name,
    fileContent,
    ...restProps
}: DeckProps & { fileContent?: string }) => {
    const deck: Deck = {
        name,
        cards: CollectionParser.serialize(fileContent, SectionName.Sideboard, SectionName.Maybeboard),
        isDirty: false,
        ...restProps,
    };
    dispatch({
        type: "CreateDeck",
        link: await createNewFile({
            name: `${name}.txt`,
            props: {
                name,
                ...restProps,
            },
            fileContent,
        }),
        ...deck,
    });
    downloadCards(dispatch, state)(deck);
};

const downloadDeck = (dispatch: React.Dispatch<Action>, state: AppStateT) => async (name: string, file: gapi.client.drive.File) => {
    const deck: Deck = {
        name,
        cards: CollectionParser.serialize(await GoogleApi.getFileContents({ id: file.id! }), SectionName.Sideboard, SectionName.Maybeboard),
        isDirty: false,
        previewUrl: file.appProperties?.previewUrl,
    };
    dispatch({ type: "CreateDeck", link: file.id!, ...deck });
    downloadCards(dispatch, state)(deck);
};

const deleteDeck = (dispatch: React.Dispatch<Action>) => async ({ name, id }: { name: string; id: string }) => {
    await deleteFile({ id });
    dispatch({ type: "DeleteDeck", name });
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
    createNewFile,
    updateFile,
    deleteFile,
    createNewDeck,
    downloadDeck,
    deleteDeck,
    getFileContents,
};
export default GoogleApi;
