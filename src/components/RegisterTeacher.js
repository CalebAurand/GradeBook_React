import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";

const RegisterTeacher = () => {
  
  const navigate = useNavigate();

  const [userState, setUserState] = useState({
    full_name: "",
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

  const register = (e) => {
    e.preventDefault();
    let newTeacher = {
      name: userState.full_name,
      email: userState.email,
      password: userState.password
    };
    console.log("new student to register info", newTeacher);
    // fetch POST request to register new student (newStudent);
    fetch('http://localhost:9000/teacher-registration',{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newTeacher)
    })
    .then(res=>res.text())
    .then(response=>{
      console.log("register new teacher response", response);
      //once response received, navigate back to home page
      navigate("/login");
    })

    };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <form className="login-form" onSubmit={register}>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={userState.full_name}
            name="full_name"
            label="Full Name"
            type="text"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={userState.email}
            name="email"
            label="Email"
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
            className="register-button"
            variant="contained"
            color="primary"
            sx={{backgroundColor: 'blue', width: '10vw', margin: '10px'}}
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default RegisterTeacher;
