import { Button, ButtonGroup, Tooltip, Typography } from "@material-ui/core";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React from "react";
import styled from "../../Styled/Theme";
import { PreviewStyle } from "../CollectionPreview";

const Body = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${p => p.theme.spacing(1)}px;

    & .MuiTypography-root {
        margin-right: ${p => p.theme.spacing(1)}px;
    }

    & .MuiButton-root {
        padding-left: 0;
        padding-right: 0;
    }
`;

const IconForStyle = (style: PreviewStyle) => {
    switch (style) {
        case "Standard":
            return <ViewListIcon />;
        case "List":
            return <ViewHeadlineIcon />;
        case "Images":
            return <ViewModuleIcon />;
    }
    throw Error(`Style ${style} does not have an icon.`);
};

type Props = {
    style: PreviewStyle;
    onToggle: (style: PreviewStyle) => void;
};

const PreviewStyleToggle: React.FC<Props> = ({ style, onToggle }) => {
    return (
        <Body>
            <Typography variant="caption">Display:</Typography>
            <ButtonGroup variant="outlined" size="small">
                {(["Standard", "List", "Images"] as const).map(s => (
                    <Button key={s} onClick={() => onToggle(s)} variant={style === s ? "contained" : undefined}>
                        <Tooltip title={s}>{IconForStyle(s)}</Tooltip>
                    </Button>
                ))}
            </ButtonGroup>
        </Body>
    );
};
export default PreviewStyleToggle;
