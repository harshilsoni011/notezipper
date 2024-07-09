import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectToDashboard = () => {
    const token = useSelector(state => state?.userLogin?.loggedInUser);
    const location = useLocation()
    console.log("🚀 ~ RedirectToDashboard ~ location:", location)
    let redirectRoute = "/notes"
    if (location?.state?.from) {
        if (location?.state?.from?.pathname) {
            redirectRoute = `${location.state.from.pathname}`
            if (location?.state?.from?.search) {
                redirectRoute += location.state.from.search
            }
        }
    }
    return !!token ? (
        <Navigate to={redirectRoute} state={{ from: location }} replace />
    ) : (
        <Outlet />
    )
}
export default RedirectToDashboard
