import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Container, useFormControl } from "@mui/material";

const TeacherLogin = (props) => {
  const { user, fetchLogin} = props;
  
  const navigate = useNavigate();

  const [userState, setUserState] = useState({
    email: "",
    password: ""
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setUserState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const login = (e) => {
    e.preventDefault();
    // set cookie here loggedIn=true;max-age=60*1000
    //if we use the cookie module maxAge- the set time is in seconds, not milliseconds
    // document.cookie = cookie.serialize("loggedIn", "true", {maxAge: 60});
    // set loggedIn = true and max-age = 60*1000 (one minute)
    
    let newUser = {
      email: userState.email,
      password: userState.password
    }
   
      fetchLogin(newUser);
    // setUser(newUser); this is done in the fetchLogin action reducer now
    
    };

    useEffect(() => {
      user.email && navigate("/")
    });


  return (
    <div >
      <Container maxWidth="sm" sx={{marginTop: '10vh', width: "75vw"}}>
        <form className="login-form" onSubmit={login}>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={userState.email}
            name="email"
            label="Email"
            type="text"
            sx={{maxWidth: '440px'}}
            variant="standard"
          />
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={userState.password}
            name="password"
            label="Password"
            type="password"
            sx={{maxWidth: '440px'}}
            variant="standard"
          />
          <Button
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
            sx={{backgroundColor: 'blue', width: '10vw', margin: '10px', minWidth: '114px'}}
          >
            Login
          </Button>
          <Link to="/teacher-registration">
            <Button
              type="button"
              className="register-button"
              variant="contained"
              color="primary"
              sx={{backgroundColor: 'blue', width: '10vw', margin: '10px', minWidth: '114px'}}
            >
              Register
            </Button>
          </Link>
        </form>
      </Container>
    </div>
  );
};

export default TeacherLogin;
