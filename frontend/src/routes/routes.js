import LandingPage from "../../src/pages/landingPage/landingPage";
import Login from "../../src/pages/login/login";
import Register from "../../src/pages/register/register";
import CreateNote from "../../src/pages/MyNotes/createNotes";
import Logout from "../../src/pages/logout/logout";
import MyNotes from "../../src/pages/MyNotes/MyNotes";
import ProfileScreen from '../../src/pages/profile/profile';

const protectedRoutes = [
    {
        path: "/my-profile",
        component: <ProfileScreen />,
    },
    {
        path: "/create-note",
        component: <CreateNote />,
    },
    {
        path: "/edit-note/:id",
        component: <CreateNote />,
    },
    {
        path: "/notes",
        component: <MyNotes />,
    },
]

const publicRoutes = [
    { path: "/logout", component: <Logout /> },
    { path: "/login", component: <Login /> },
    { path: "/", component: <LandingPage /> },
    { path: "/register", component: <Register /> }
]

export { protectedRoutes, publicRoutes }