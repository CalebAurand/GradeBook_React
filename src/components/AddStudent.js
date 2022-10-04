import React, {useState} from 'react';
import { TextField, Button, Container } from '@mui/material'
import {useNavigate, useParams} from 'react-router-dom'

const AddStudent = (props) => {
  const { user, classes } = props;
  const {id} = useParams();
  const classId = id;
  const navigate = useNavigate();
  let currentClass = classes.find(clas => {
    return clas.id === parseInt(id)
  });

  const [studentInfo, setStudentInfo] = useState({
    studentId: 0
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

    const trimdJWT = user.userJWT.slice(1, user.userJWT.length-1);
    fetch(`http://localhost:9000/add-student/${classId}`,{
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
      {user && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {user.email}</div>}
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
            className="login-button"
            variant="contained"
            color="primary"
            sx={{backgroundColor: 'blue', width: '10vw', margin: '10px'}}
          >
            Add Student
          </Button>
        </form>
      </Container>
      </div>
  )
}

export default AddStudent