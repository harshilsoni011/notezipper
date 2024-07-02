import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import LandingPage from "./pages/landingPage/landingPage";
import MyNotes from "./pages/MyNotes/MyNotes";
import CreateNote from "./pages/MyNotes/createNotes";
import Login from "./pages/login/login";
import Logout from "./pages/logout/logout";
import Register from "./pages/register/register";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ProfileScreen from './pages/profile/profile';
import { protectedRoutes, publicRoutes } from './routes';
import RedirectToDashboard from './pages/redirectToDashborad';
import RequireAuth from './pages/requireAuth';

function App() {

  const loggedInUser = useSelector(state => state?.userLogin?.loggedInUser);

  return (
    <BrowserRouter>
      <Header userEmail={loggedInUser?.email} />
      <main>
        <Routes>
          {/* <Route element={<RedirectToDashboard />}>
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={route.component}
                key={idx}
                exact={true}
              />
            ))
            }
          </Route>

          {protectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<RequireAuth>
                {route.component}
              </RequireAuth>}
              key={idx}
              exact={true}
            />
          ))} */}
          {/* </Route> */}
          <Route path='/' Component={LandingPage} exact />
          <Route path='/logout' Component={Logout} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route path='/notes' element={<MyNotes />} />
          <Route path='/notes' Component={MyNotes} />
          <Route path='/create-note' Component={CreateNote} />
          <Route path='/edit-note/:id' Component={CreateNote} />
          <Route path='/my-profile' Component={ProfileScreen} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
