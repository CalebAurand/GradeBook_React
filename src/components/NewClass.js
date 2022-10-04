import React, {useState} from 'react';
import { TextField, Button, Container } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import cookie from 'cookie';

const NewClass = (props) => {
  const { user } = props;
  const cookies = cookie.parse(document.cookie);
  const trimdJWT = cookies.userJWT;
  const navigate = useNavigate();
  const [classInfo, setClassInfo] = useState({
    name: "",
    subject: ""
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setClassInfo((prevState)=>{
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const createNewClass = (e) => {
    e.preventDefault();
    let classObj = {
      class_name: classInfo.name,
      class_subject: classInfo.subject
    };
    console.log("classObject is ", classObj);
    //fetch POST request here

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
      console.log("create new class response", response);
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

export default NewClass