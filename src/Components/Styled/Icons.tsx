import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "./Theme";

const IconWrap = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CompressIcon: React.FC = () => (
    <IconWrap>
        <FontAwesomeIcon icon={faCompressAlt} />
    </IconWrap>
);
export const ExpandIcon: React.FC = () => (
    <IconWrap>
        <FontAwesomeIcon icon={faExpandAlt} />
    </IconWrap>
);
