import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom'
import cookie from 'cookie';
import { TextField, Button, Container } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

const AddAssignment = (props) => {
  const { user, classes } = props;
  const {id} = useParams();
  const cookies = cookie.parse(document.cookie);
  const classId = id;
  const navigate = useNavigate();
  const [currentClass, setCurrentClass] = useState({});
  const trimdJWT = cookies.userJWT;

  useEffect(()=> {
    fetch(`http://localhost:9000/view-class/${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+cookies.userJWT
      }
    })
    .then(res=>res.json())
    .then(response=>setCurrentClass(response[0]))
    console.log("currentClass after set", currentClass)
  }, [setCurrentClass]);

  const [assignmentInfo, setAssignmentInfo] = useState({
    name: "",
    assignment_type: "",
    description: ""
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setAssignmentInfo((prevState)=>{
      console.log("assignment info state", assignmentInfo)
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const addNewAssignment = (e) => {
    e.preventDefault();
    let assignmentObj = {
      name: assignmentInfo.name,
      type: assignmentInfo.assignment_type,
      description: assignmentInfo.description
    };
    console.log("assignment Object is ", assignmentObj);
    //fetch POST request here

    fetch(`http://localhost:9000/add-assignment/${classId}`,{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      },
      body: JSON.stringify(assignmentObj)
    })
    .then(res=>res.text())
    .then(response=>{
      console.log("create new assignment response", response);
      //once response received, navigate back to home page
      navigate(`/assignments/${classId}`);
    })
  }

  return (
    <div>
      {cookies.email && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <Container sx={{maxWidth: '900px', width: '600px'}}>
      {currentClass && <h3 style={{display: 'inline-block', marginRight: '45px'}}>{currentClass.class_name} Add Assignment</h3>}
      <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/assignments/${classId}`}>
        <Button variant="outlined" sx={{fontWeight: 'bold', marginLeft: '5px'}}>
          Assignments
        </Button>
      </Link>
        <form className="login-form" onSubmit={addNewAssignment}>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={assignmentInfo.name}
            name="name"
            label="Assignment Name"
            type="text"
            variant="standard"
          />
          <FormControl sx={{width: '100%', marginTop: '13px'}}>
            <FormLabel id="demo-row-radio-buttons-group-label" sx={{textAlign: 'left'}}>Assignment Type</FormLabel>
              <RadioGroup row name="assignment_type" onChange={handleTextChange} value={assignmentInfo.type}>
                <FormControlLabel value="hw" control={<Radio />} label="Homework" />
                <FormControlLabel value="quiz" control={<Radio />} label="Quiz" />
                <FormControlLabel value="project" control={<Radio />} label="Project" />
                <FormControlLabel value="test" control={<Radio />} label="Test" />
              </RadioGroup>
          </FormControl>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={assignmentInfo.description}
            name="description"
            label="Assignment Description"
            type="text"
            variant="standard"
          />
          <Button
            type="submit"
            className="login-button"
            variant="outlined"
            color="primary"
            sx={{ width: '15vw', minWidth: '250px', margin: '15px', border: '2px solid'}}
          >
            <strong>Add Assignment</strong>
          </Button>
        </form>
      </Container>
      </div>
  )
}

export default AddAssignment