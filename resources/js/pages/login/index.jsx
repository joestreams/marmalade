import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AppContext } from "../../context";
import { Button, Page } from "../../components";

export function Login() {
    const { user } = useContext(AppContext);
    const location = useLocation();

    if (user) {
        return <Navigate to="/" state={{ pathname: location }} />;
    }

    return (
        <Page>
            <h1 className="my-4 text-2xl font-semibold tracking-tight">
                Login to Marmalade
            </h1>
            <Button href="/auth/spotify/redirect">Login with Spotify</Button>
        </Page>
    );
}
