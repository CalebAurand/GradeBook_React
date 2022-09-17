import React, {useState} from 'react';
import { TextField, Button, Container } from '@mui/material'
import {useNavigate} from 'react-router-dom'

const NewClass = (props) => {
  const { user } = props;
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