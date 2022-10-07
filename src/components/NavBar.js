import React, { useEffect } from 'react';
import cookie from 'cookie';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';


export default function NavBar(props) {
  const navigate = useNavigate();
  const { unsetUser} = props;
  const cookies = cookie.parse(document.cookie);
  const location = useLocation().pathname;
  console.log("location", location)

  useEffect(()=>{
    const navToggle = document.querySelector('.nav-toggle');
    const app = document.querySelector('.App');
    const navLinks = document.querySelectorAll('.nav__link');


    navToggle.addEventListener('click', ()=>{
      console.log("app classlist", app.classList)
      app.classList.toggle('nav-open');
    })

    navLinks.forEach(link=>{
      link.addEventListener('click', ()=>{
        app.classList.remove('nav-open');
      })
    })
    return ()=>{
      navToggle.removeEventListener('click', ()=>{
        document.app.classList.toggle('nav-open');
      })
      navLinks.forEach(link => {
        link.removeEventListener('click', ()=>{
          document.body.classList.remove('nav-open');
        })
      })
    }

  }, [])


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{backgroundColor: "#03BEFD"}}position="static">
        <Toolbar className="nav--list-toolbar">
          <Typography variant="h6" component="div" className="header--logo" sx={{ flexGrow: 1, textAlign: 'left'}}>
            Home Grade Book
          </Typography>
          <ul className="nav--list">
            {cookies.role === 'teacher' ? <li className="nav-list-item">
              <Link className="nav__link" style={{color: 'white', textDecoration: 'none', fontFamily: 'Helvetica'}} to="/">Home</Link>
            </li> :
            <li className="nav-list-item">
              <Link style={{color: 'white', textDecoration: 'none', fontFamily: 'Helvetica'}} to="/student-home">Home</Link>
            </li>}
            {cookies.role === 'teacher' && 
            <li className="nav-list-item">
              <Link style={{color: 'white', textDecoration: 'none', fontFamily: 'Helvetica'}} to="/students">Students</Link>
            </li>}
            {cookies.loggedIn === 'true' ?
            ((cookies.role === 'teacher' && 
            <li
              className="nav-list-item"
              style={{
                color: 'white',
                cursor: 'pointer',
                listStyleType: 'none',
                textDecoration: 'none'}}
              onClick={() => {
                document.cookie = cookie.serialize("loggedIn", null, {
                maxAge: 0,
                });
                document.cookie = cookie.serialize("userJWT", null, {
                  maxAge: 0,
                });
                document.cookie = cookie.serialize("email", null, {
                  maxAge: 0,
                });
                document.cookie = cookie.serialize("role", null, {
                  maxAge: 0,
                });
              unsetUser();
              navigate("/login");
              }}
            >
              Logout
            </li>) || 
            (cookies.role === 'student' && 
            <li
              className="nav-list-item"
              style={{
                color: 'white',
                cursor: 'pointer',
                listStyleType: 'none',
                textDecoration: 'none'}}
              onClick={() => {
                document.cookie = cookie.serialize("loggedIn", null, {
                maxAge: 0,
              });
              document.cookie = cookie.serialize("userJWT", null, {
                maxAge: 0,
              });
              document.cookie = cookie.serialize("email", null, {
                maxAge: 0,
              });
              document.cookie = cookie.serialize("role", null, {
                maxAge: 0,
              });
              unsetUser();
              navigate("/student-login");
            }}
            >
              Logout
            </li>)) :
            (location === "/student-registration" ?
            <li className="nav-list-item">
            <Link 
              style={{
                color: 'white',
                cursor: 'pointer',
                listStyleType: 'none',
                textDecoration: 'none'}} to="/student-login">Login</Link>
            </li> :
            <li className="nav-list-item">
            <Link 
              style={{
                color: 'white',
                cursor: 'pointer',
                listStyleType: 'none',
                textDecoration: 'none'}} to="/login">Login</Link>
            </li>
            )}
          </ul>
          <button className="nav-toggle" aria-label="toggle navigation">
            <span className="hamburger"></span>
          </button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
