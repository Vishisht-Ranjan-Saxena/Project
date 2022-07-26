
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notfound from './components/Notfound';
import { createTheme, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Authorisor from './components/Auth';
import { UserProvider } from "./useContext";
import Forgotpassword from './components/Forgotpassword';

function App() {

  const [darkTheme, setDarkTheme] = useState(false) ;

  const myLightTheme = createTheme({
    palette: {
      // primary: {
      //   main : '#fd7700'
      // }
    }
  })
  const myDarkTheme = createTheme({
    palette: {
      mode : 'dark',
      background: {
        paper: '#333'
      }
    },

  })

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")))


  return (
    <div className='bgd'>
    <ThemeProvider theme={ darkTheme ? myDarkTheme : myLightTheme }>
    <UserProvider user={currentUser}>
      <BrowserRouter>

      {/* <Link to="/home">Home Page</Link>
      <Link to="/login">Login Page</Link> */}

      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />

        <Routes>
          <Route element={ <Home></Home> } path="home" />
          <Route element={ <Login></Login> } path="login" />
          <Route element={
        <Authorisor>
          <Chat />
        </Authorisor>
       }path="/chat"/>
          <Route element={ <Signup /> } path="signup" />
          {/* <Route element={ <Chat /> } path="chat" /> */}
          
          <Route element={<Navigate to="/login" />}  path="/" />

          <Route element={ <Notfound /> } path="*" />

          <Route element={<Forgotpassword></Forgotpassword>}path="/forgotpassword"/>

        </Routes>
      </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;