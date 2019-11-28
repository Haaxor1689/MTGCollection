import React from "react";
import { Button, Typography } from "@material-ui/core";

type Props = {
    variant?: "text" | "outlined" | "contained";
    onClick: () => void;
};

const SignInButton: React.FC<Props> = ({ variant, onClick }: Props) => {
    return (
        <Button variant={variant} onClick={onClick}>
            <Typography noWrap>Sign in with Google</Typography>
        </Button>
    );
};

export default SignInButton;
