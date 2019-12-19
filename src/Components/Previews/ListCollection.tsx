import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import IndentedTypography from "../Styled/IndentedTypography";
import styled from "../Styled/Theme";
import { CollectionPreviewProps } from "./CollectionPreview";
import ListCard from "./ListCard";

const CustomPaddingTable = styled(Table)`
    & .MuiTableCell-sizeSmall {
        padding: ${p => p.theme.spacing(0.25, 1)};
    }
`;

export const NumberCell = styled(TableCell)`
    width: 40px;
`;

const ListCollecion: React.FC<CollectionPreviewProps> = ({ cards, sortBy, sortOrder, showGroups, ...props }) => {
    return (
        <CustomPaddingTable size="small" aria-label="card table">
            <TableHead>
                <TableRow>
                    <NumberCell align="center">#</NumberCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Set</TableCell>
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
                        <TableCell colSpan={6}>
                            <IndentedTypography color="textSecondary">Empty</IndentedTypography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </CustomPaddingTable>
    );
};
export default ListCollecion;
