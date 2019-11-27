import React from "react";
import GoogleApi from "../Utility/GoogleApi";

const SignIn: React.FC = () => {
    return <button onClick={GoogleApi.signIn}>Sign in to google</button>;
};

export default SignIn;
