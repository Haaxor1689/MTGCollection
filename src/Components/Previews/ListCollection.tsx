import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import IndentedTypography from "../Styled/IndentedTypography";
import styled from "../Styled/Theme";
import { CollectionPreviewProps } from "./CollectionPreview";
import ListCard from "./ListCard";

const CustomPaddingTable = styled(Table)`
    width: 100%;
    overflow-y: scroll;
    & .MuiTableCell-sizeSmall {
        padding: ${p => p.theme.spacing(0.25, 1)};
    }
`;

export const SetWidthCell = styled(TableCell).attrs<{ width: string }>(p => ({
    width: p.width,
}))<{ width: string }>``;

export const NameCell = styled(TableCell)`
    width: 60%;
    max-width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const ListCollecion: React.FC<CollectionPreviewProps> = ({ cards, sortBy, sortOrder, showGroups, ...props }) => {
    return (
        <CustomPaddingTable size="small" aria-label="card table">
            <TableHead>
                <TableRow>
                    <SetWidthCell width="40px" align="center">
                        #
                    </SetWidthCell>
                    <NameCell>Name</NameCell>
                    <SetWidthCell width="40px" align="center">
                        Set
                    </SetWidthCell>
                    <TableCell>Cost</TableCell>
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
