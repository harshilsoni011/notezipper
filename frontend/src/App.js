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

function App() {

  const loggedInUser = useSelector(state => state?.userLogin?.loggedInUser)
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  return (
    <BrowserRouter>
      {/* <Header userEmail={loggedInUser?.email} /> */}
      <Header searchValue={searchValue} onSearchChange={handleSearchChange} userEmail={loggedInUser?.email} />
      <main>
        <Routes>
          <Route path='/' Component={LandingPage} exact />
          <Route path='/logout' Component={Logout} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route path='/notes' element={<MyNotes searchValue={searchValue.trim()} />} />
          {/* <Route path='/notes' Component={MyNotes} /> */}
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
