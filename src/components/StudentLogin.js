import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";

const StudentLogin = (props) => {
  const { user, setUser, fetchLogin, userJWT } = props;
  
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
    };

    fetchLogin(newUser);
    // setUser(newUser);

    /**NEED TO FIND A WAY TO AUTO NAVIGATE USER TO THE HOME PAGE AFTER LOGIN */
    };

    useEffect(()=>{
      user.email && navigate("/student-home");
    })

  return (
    <div className="App">
      <Container maxWidth="sm">
        <form className="login-form" onSubmit={login}>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={userState.email}
            name="email"
            label="Student Email"
            type="text"
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
            variant="standard"
          />
          <Button
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
            sx={{backgroundColor: 'blue', width: '10vw', margin: '10px'}}
          >
            Login
          </Button>
          {userJWT && <p>{userJWT}</p>}
        </form>
      </Container>
    </div>
  );
};

export default StudentLogin;
