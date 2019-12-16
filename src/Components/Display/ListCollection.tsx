import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import ListCard from "./ListCard";
import { CollectionPreviewProps } from "./CollectionPreview";

const ListCollecion: React.FC<CollectionPreviewProps> = ({ cards, sortBy, sortOrder, showGroups, ...props }) => {
    return (
        <Table size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Set</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cards.length >= 1 ? (
                    cards.map(c => <ListCard key={c.name} card={c} {...props} />)
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
