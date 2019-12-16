import ListAltIcon from "@material-ui/icons/ListAlt";
import React from "react";
import TooltipButton from "../Styled/TooltipButton";
import styled from "../Styled/Theme";

const Body = styled.div`
    margin-bottom: ${p => p.theme.spacing(1)}px;
    margin-left: ${p => p.theme.spacing(1)}px;
`;

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
};

const ShowGroupsToggle: React.FC<Props> = ({ show, setShow }) => {
    return (
        <Body>
            <TooltipButton size="small" title={show ? "Hide groups" : "Show groups"} onClick={() => setShow(!show)}>
                <ListAltIcon />
            </TooltipButton>
        </Body>
    );
};
export default ShowGroupsToggle;
