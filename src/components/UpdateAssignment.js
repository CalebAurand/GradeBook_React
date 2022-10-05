import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom'
import cookie from 'cookie';
import { TextField, Button, Container } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

const UpdateAssignment = (props) => {
  const {id} = useParams();
  const cookies = cookie.parse(document.cookie);
  const trimdJWT = cookies.userJWT;
  const assignmentId = id;
  const navigate = useNavigate();
  const [classId, setClassId] = useState(null);
  const [assignmentInfo, setAssignmentInfo] = useState({});

  const [newAssignmentInfo, setNewAssignmentInfo] = useState({
    name: "",
    assignment_type: "",
    description: ""
  });

  useEffect(()=> {
    fetch(`http://localhost:9000/assignment/${id}`, {
      method: "GET",
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("get assignment response", response);
      //once response received, navigate back to home page
      setAssignmentInfo(response[0]);
      setClassId(response[0].class_id);
    })
  }, [id]);


  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setNewAssignmentInfo((prevState)=>{
      console.log("assignment info state", assignmentInfo)
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const updateAssignment = (e) => {
    e.preventDefault();
    let assignmentObj = {
      name: newAssignmentInfo.name,
      type: newAssignmentInfo.assignment_type,
      description: newAssignmentInfo.description
    };
    console.log("assignment Object is ", assignmentObj);
    //fetch POST request here

    fetch(`http://localhost:9000/update-assignment/${assignmentId}`,{
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      },
      body: JSON.stringify(assignmentObj)
    })
    .then(res=>res.text())
    .then(response=>{
      console.log("update assignment response", response);
      //once response received, navigate back to assignments page
      navigate(`/assignments/${classId}`);
    })
  }

  return (
    <div>
      {cookies.email && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <Container sx={{maxWidth: '900px', width: '600px'}}>
      {classId && <h3 style={{display: 'inline-block', marginRight: '75px'}}> Update Assignment: {assignmentInfo.assignment_name}</h3>}
      <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/assignments/${classId}`}>
        <Button variant="outlined" sx={{fontWeight: 'bold', marginLeft: '5px'}}>
          Assignments
        </Button>
      </Link>
        <form className="update--assignment-form" onSubmit={updateAssignment}>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={newAssignmentInfo.name}
            name="name"
            helperText={`Current Name: ${assignmentInfo.assignment_name}`}
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
            helperText={`Current Description: ${assignmentInfo.assignment_description}`}
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
            <strong>Update Assignment</strong>
          </Button>
        </form>
      </Container>
      </div>
  )
}

export default UpdateAssignment