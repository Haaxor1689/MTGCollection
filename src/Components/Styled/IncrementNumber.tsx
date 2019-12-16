import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { IconButton, Typography } from "@material-ui/core";

type Props = {
    val: number;
    onChange: (val: number) => void;
};

const IncrementNumber: React.FC<Props> = ({ val, onChange }) => {
    return (
        <Typography noWrap>
            <IconButton size="small" onClick={() => onChange(val + 1)}>
                <AddIcon fontSize="inherit" />
            </IconButton>
            {val}
            <IconButton size="small" onClick={() => onChange(val - 1)}>
                <RemoveIcon fontSize="inherit" />
            </IconButton>
        </Typography>
    );
};
export default IncrementNumber;
