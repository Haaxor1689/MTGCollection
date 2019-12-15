import React from "react";
import { Button, Typography } from "@material-ui/core";
import { GoogleIcon } from "./Styled/Icons";

type Props = {
    variant?: "text" | "outlined" | "contained";
    onClick: () => void;
};

const SignInButton: React.FC<Props> = ({ variant, onClick }: Props) => {
    return (
        <Button variant={variant} onClick={onClick} startIcon={<GoogleIcon />}>
            <Typography noWrap>Sign in with Google</Typography>
        </Button>
    );
};

export default SignInButton;
