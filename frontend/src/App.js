import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { protectedRoutes, publicRoutes } from '../src/routes/routes';
import RedirectToDashboard from './routes/redirectToDashborad';
import RequireAuth from './routes/requireAuth';

function App() {

  const loggedInUser = useSelector(state => state?.userLogin?.loggedInUser);

  return (
    <BrowserRouter>
      <Header userEmail={loggedInUser?.email} />
      <main>
        <Routes>
          <Route element={<RedirectToDashboard />}>
            {publicRoutes.map((route, idx) => (
              < Route
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
          ))}
          {/* </Route> */}
          {/* <Route path='/' Component={LandingPage} exact />
          <Route path='/logout' Component={Logout} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route path='/notes' element={<MyNotes />} />
          <Route path='/notes' Component={MyNotes} />
          <Route path='/create-note' Component={CreateNote} />
          <Route path='/edit-note/:id' Component={CreateNote} />
          <Route path='/my-profile' Component={ProfileScreen} /> */}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
