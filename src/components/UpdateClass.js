import React, {useState, useEffect} from 'react';
import { TextField, Button, Container } from '@mui/material'
import {useNavigate, useParams} from 'react-router-dom'
import cookie from 'cookie';

const UpdateClass = (props) => {
  const cookies = cookie.parse(document.cookie);
  const {id} = useParams();
  const trimdJWT = cookies.userJWT;
  const navigate = useNavigate();
  const [classInfo, setClassInfo] = useState({
    name: "",
    subject: ""
  }
  );
  const [newClassInfo, setNewClassInfo] = useState({
    name: "",
    subject: ""
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setNewClassInfo((prevState)=>{
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  useEffect(()=> {
    console.log("getting class")
    fetch(`http://localhost:9000/view-class/${id}`, {
      method: "GET",
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("get class response", response);
      //once response received, navigate back to home page
      setClassInfo(response[0]);
    })
  }, []);

  const updateClass = (e) => {
    e.preventDefault();
    let classObj = {
      class_name: newClassInfo.name,
      class_subject: newClassInfo.subject
    };
    console.log("classObject is ", classObj);
    //fetch POST request here

    fetch(`http://localhost:9000/update-class/${id}`,{
      method: 'PUT',
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
    <div>
      {cookies.email && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <Container maxWidth="sm">
        <form className="login-form" onSubmit={updateClass}>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={newClassInfo.name}
            name="name"
            label="Class Name"
            helperText={`Current Class Name: ${classInfo.class_name}`}
            type="text"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={newClassInfo.class_subject}
            name="subject"
            label="Class Subject"
            helperText={`Current Subjet: ${classInfo.class_subject}`}
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
      </div>
  )
}

export default UpdateClass