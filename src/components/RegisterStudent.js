import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";

const RegisterStudent = () => {
  
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
    let newStudent = {
      name: userState.full_name,
      email: userState.email,
      password: userState.password
    };
    console.log("new student to register info", newStudent);
    // fetch POST request to register new student (newStudent);
    fetch('http://localhost:9000/student-registration',{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newStudent)
    })
    .then(res=>res.text())
    .then(response=>{
      console.log("register new student response", response);
      //once response received, navigate back to home page
      navigate("/student-login");
    })

    };

  return (
    <div className="App">
      <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '1vh', width: '100vw' }}>
        Student Registration
      </div>
      <Container maxWidth="sm">
        <form className="login-form" onSubmit={register}>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={userState.full_name}
            name="full_name"
            label="Student's Full Name"
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

export default RegisterStudent;
