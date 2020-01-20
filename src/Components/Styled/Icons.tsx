import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faClipboard, faCompressAlt, faDiceD20, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
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

export const GoogleIcon: React.FC = () => (
    <IconWrap>
        <FontAwesomeIcon icon={faGoogle} />
    </IconWrap>
);

export const ClipboardIcon: React.FC = () => (
    <IconWrap>
        <FontAwesomeIcon icon={faClipboard} />
    </IconWrap>
);

export const LifecounterIcon: React.FC = () => (
    <IconWrap>
        <FontAwesomeIcon icon={faDiceD20} />
    </IconWrap>
);
