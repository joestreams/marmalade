import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AppContext } from "../../context";

export function Page({ children, requiresAuth = false }) {
    const { user } = useContext(AppContext);
    const location = useLocation();

    const shouldRedirectToLogin = requiresAuth && !user;
    const shouldRedirectToSetup =
        requiresAuth &&
        location.pathname !== "/setup" &&
        user !== null &&
        user.owned_artists.length === 0;
    const shouldRedirectToHome =
        requiresAuth &&
        location.pathname === "/setup" &&
        user !== null &&
        user.owned_artists.length > 0;

    if (shouldRedirectToLogin) {
        return <Navigate to="/login" state={{ pathname: location }} />;
    } else if (shouldRedirectToSetup) {
        return <Navigate to="/setup" state={{ pathname: location }} />;
    } else if (shouldRedirectToHome) {
        return <Navigate to="/" state={{ pathname: location }} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">{children}</div>
    );
}
