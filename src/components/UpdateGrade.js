import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom'
import cookie from 'cookie';
import { TextField, Button, Container } from '@mui/material'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(3, 190, 253, .6)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(0, 0, 0, .03)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UpdateGrade = (props) => {
  const {id} = useParams();
  const cookies = cookie.parse(document.cookie);
  const trimdJWT = cookies.userJWT;
  const gradeId = id;
  const navigate = useNavigate();
  const [assignmentId, setAssignmentId] = useState(null);
  const [gradeInfo, setGradeInfo] = useState({});

  const [newGradeInfo, setNewGradeInfo] = useState({
    grade: gradeInfo.grade,
    comments: ''
  });

  useEffect(()=> {
    fetch(`http://localhost:9000/grade_details/${gradeId}`, {
      method: "GET",
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("get grade response", response);
      //once response received, navigate back to home page
      setGradeInfo(response[0]);
      setAssignmentId(response[0].assignment_id);
    })
  }, [id]);


  const handleTextChange = (e) => {
    const { name, value } = e.target;
      setNewGradeInfo((prevState)=>{
        console.log("grade info state", gradeInfo);
        return {
          ...prevState,
          [name]: value
        }
      })
    console.log("newgradeInfo state", newGradeInfo)
  }

  const updateGrade = (e) => {
    e.preventDefault();
    let gradeObj = {
      grade: parseInt(newGradeInfo.grade),
      comments: newGradeInfo.comments
    };
    console.log("assignment Object is ", gradeObj);
    //fetch POST request here

    fetch(`http://localhost:9000/update-grade/${gradeId}`,{
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      },
      body: JSON.stringify(gradeObj)
    })
    .then(res=>res.text())
    .then(response=>{
      console.log("update assignment response", response);
      //once response received, navigate back to assignments page
      navigate(`/grade/${gradeId}`);
    })
  }

  return (
    <div>
      {cookies.email && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
      <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      {gradeId && <h3 style={{display: 'inline-block', marginRight: '75px'}}> Update Grade: {gradeInfo.assignment_name}</h3>}
      <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/grades/${gradeInfo.class_id}`}>
        <Button variant="outlined" sx={{fontWeight: 'bold', marginLeft: '5px'}}>
          Grades
        </Button>
      </Link>
      <Table sx={{ marginTop: 0, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Grade Id</StyledTableCell>
            <StyledTableCell align="center">Student Name</StyledTableCell>
            <StyledTableCell align="center">Assignment Name</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Grade</StyledTableCell>
            <StyledTableCell align="center">Comments</StyledTableCell>
          </TableRow>
        </TableHead>

        {gradeInfo && <TableBody>
            <StyledTableRow>
              <StyledTableCell sx={{width: '5vw'}} align="center">{gradeInfo.gradeId}</StyledTableCell>
              <StyledTableCell align="center" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                {gradeInfo.user_name}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                {gradeInfo.assignment_name}
              </StyledTableCell>
              <StyledTableCell sx={{width: '5vw'}} align="center">{gradeInfo.assignment_type}</StyledTableCell>
              <StyledTableCell sx={{width: '5vw'}} align="center">
                {gradeInfo.assignment_type === 'quiz' && `${gradeInfo.grade}/10`}
                {gradeInfo.assignment_type === 'test' && `${gradeInfo.grade}/100`}
                {gradeInfo.assignment_type === 'hw' && `${gradeInfo.grade}/5`}
                {gradeInfo.assignment_type === 'project' && `${gradeInfo.grade}/50`}
              </StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">{gradeInfo.assignment_description}</StyledTableCell>
              
            </StyledTableRow>
        </TableBody>}
      </Table>
      <Container sx={{width: '30vw'}}>
        <form className="update--assignment-form" onSubmit={updateGrade}>
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={newGradeInfo.grade}
            name="grade"
            helperText={`Current Grade: ${gradeInfo.grade}`}
            label="New Grade"
            type="text"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            margin="normal"
            onChange={handleTextChange}
            value={newGradeInfo.description}
            name="comments"
            label="Grade Comments"
            helperText={`Current Comments: ${gradeInfo.comments}`}
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
            <strong>Update Grade</strong>
          </Button>
        </form>
        </Container>
      </TableContainer>
      </div>
  )
}

export default UpdateGrade