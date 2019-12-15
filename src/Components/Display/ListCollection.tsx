import React from "react";
import { DeckCard } from "../../State";
import ScrySdk from "scryfall-sdk";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import ListCard from "./ListCard";

type Props = {
    cards: (DeckCard & ScrySdk.Card)[];
};

const ListCollecion: React.FC<Props> = ({ cards }) => {
    return (
        <Paper>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Amt.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Set</TableCell>
                        <TableCell>Cost</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map(c => <ListCard key={c.name} card={c} />)}
                </TableBody>
            </Table>
        </Paper>
    );
};
export default ListCollecion;
