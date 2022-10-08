import React, {useState, useEffect} from 'react';
import cookie from 'cookie';
import { TextField, Button, Container } from '@mui/material'
import {useNavigate, useParams} from 'react-router-dom'

const AddStudent = (props) => {
  const {id} = useParams();
  const classId = id;
  const cookies = cookie.parse(document.cookie);
  const navigate = useNavigate();
  const trimdJWT = cookies.userJWT;
  const [currentClass, setCurrentClass] = useState({});

  useEffect(()=> {
    fetch(`https://home-gradebook.herokuapp.com/view-class/${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>setCurrentClass(response[0]))
    console.log("currentClass after set", currentClass)
  }, [setCurrentClass]);

  const [studentInfo, setStudentInfo] = useState({
    studentId: null
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

  const addNewStudent = (e) => {
    e.preventDefault();
    let studentObj = {
      student_id: studentInfo.studentId
      //: studentInfo.email
    };
    console.log("studentObject is ", studentObj);
    //fetch POST request here

    
    fetch(`https://home-gradebook.herokuapp.com/add-student/${classId}`,{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      },
      body: JSON.stringify(studentObj)
    })
    .then(res=>res.text())
    .then(response=>{
      console.log("create new student response", response);
      //once response received, navigate back to home page
      navigate("/");
    })
  }

  return (
    <div>
      {cookies.email && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <Container maxWidth="sm">
      {currentClass && <h3>{currentClass.class_name} Add Student</h3>}
        <form className="login-form" onSubmit={addNewStudent}>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={studentInfo.studentId}
            name="studentId"
            label="Student ID"
            type="number"
            variant="standard"
          />
          <Button
            type="submit"
            size="small"
            className="login-button"
            variant="outlined"
            color="primary"
            sx={{ width: '15vw', margin: '10px', border: '1px solid blue', fontWeight: 'bold'}}
          >
            Add Student
          </Button>
        </form>
      </Container>
      </div>
  )
}

export default AddStudent