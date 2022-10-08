import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const RegisterTeacher = () => {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    setShowMessage(true);
  }, [])

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
    fetch('https://home-gradebook.herokuapp.com/teacher-registration',{
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
      <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '1vh', width: '100vw' }}>
        Teacher Registration
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
      {showMessage && <Alert severity="warning" sx={{zIndex: 200, left: '28%', top: '38%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '39vw', borderRadius: '10px'}}>
        <AlertTitle sx={{fontWeight: 'bold'}}>
          Are You A Student?
        </AlertTitle>
        You are on the teacher registration page - <strong>Do you need the student-registration page?</strong>
        <div>
          <Button variant="contained" sx={{display: 'inline-block', marginRight: 10}}
            onClick={()=>{
              navigate("/student-registration")
              setShowMessage(false);
              }
            }
          >
            Yes
          </Button>
          <Button variant="contained" sx={{display: 'inline-block',}}
            onClick={()=>{
              setShowMessage(false);
              }
            }
          >
            No
          </Button>
        </div>
      </Alert>}
    </div>
  );
};

export default RegisterTeacher;
