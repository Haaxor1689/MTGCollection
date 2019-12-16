import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import ListCard from "./ListCard";
import { CollectionPreviewProps } from "./CollectionPreview";

const ListCollecion: React.FC<CollectionPreviewProps> = ({ cards, actions, deckName, sectionName }) => {
    return (
        <Table size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>{actions === "Deck" ? "#" : "Fav"}</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Set</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cards.length >= 1 ? (
                    cards.map(c => <ListCard key={c.name} card={c} actions={actions} deckName={deckName} sectionName={sectionName} />)
                ) : (
                    <TableRow>
                        <TableCell>Empty</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};
export default ListCollecion;
