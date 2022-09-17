import React, {useState} from 'react';
import { TextField, Button, Container } from '@mui/material'
import {useNavigate} from 'react-router-dom'

const CreateStudent = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({
    studentId: null,
    name: "",
    email: "",
    emergency_contact: "",
    accomodations: ""
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prevState)=>{
      return {
        ...prevState,
        [name]: value
      }
    })
  }

/***THIS IS WHERE I LEFT OFF... SINCE I NEED TO MAKE A STUDENT AND TEACHER REGISTRATION PAGE... THIS COMPONENT IS REDUNDANT... UNLESS TEACHERS SPECIFICALLY NEED TO BE ABLE TO CREATE STUDENT PROFILES */

  const createNewStudent = (e) => {
    e.preventDefault();
    let studentObj = {
      studentId: studentInfo.studentId,
      name: studentInfo.name,
      //: studentInfo.email
    };
    console.log("studentObject is ", studentObj);
    //fetch POST request here

    const trimdJWT = user.userJWT.slice(1, user.userJWT.length-1);
    fetch('http://localhost:9000/create-class',{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      },
      body: JSON.stringify(classObj)
    })
    .then(res=>res.text())
    .then(response=>{
      console.log("create new student response", response);
      //once response received, navigate back to home page
      navigate("/");
    })
  }
  return (
    <Container maxWidth="sm">
        <form className="login-form" onSubmit={createNewClass}>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={classInfo.name}
            name="name"
            label="Class Name"
            type="text"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={classInfo.subject}
            name="subject"
            label="Class Subject"
            type="text"
            variant="standard"
          />
          <Button
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
            sx={{backgroundColor: 'blue', width: '10vw', margin: '10px'}}
          >
            Save Class
          </Button>
        </form>
      </Container>
  )
}

export default CreateStudent