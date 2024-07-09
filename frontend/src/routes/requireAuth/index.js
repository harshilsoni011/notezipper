import React from "react"
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const RequireAuth = props => {
    const token = useSelector(state => state?.userLogin?.loggedInUser);
    const location = useLocation();
    const navigate = useNavigate();
    if (!token) {
        return (
            <Navigate
                to={{ pathname: "/login" }}
                state={{ from: location }}
                replace
            />
        )
    }

    // if (!authentiCateUserRole(user.role, props.userRole)) {
    //     const previousPath = location.state?.from || "/"
    //     return (
    //         <Navigate
    //             to={{ pathname: previousPath }}
    //             state={{ from: location.pathname }}
    //             replace
    //         />
    //     )
    // }

    return <React.Fragment>{props.children}</React.Fragment>
}
export default RequireAuth
