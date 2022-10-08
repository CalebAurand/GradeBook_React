import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import cookie from 'cookie';
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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

const DetailsStudent = (props) => {
  const [studentId, setStudentId] = useState();
  const [studentInfo, setStudentInfo] = useState();
  const [studentGrades, setStudentGrades] = useState([]);
  const [classId, setClassId] = useState(null);
  const {id} = useParams();
  const cookies = cookie.parse(document.cookie);
  const trimdJWT = cookies.userJWT;

  useEffect(() => {
    //fetch request here
    fetch(`https://home-gradebook.herokuapp.com/view-student/${id}`, {
      method: "GET",
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("get student details response", response);
      //once response received, navigate back to home page
      setStudentInfo(response[0]);
      setStudentId(response[0].id);
    })
  }, [id]);

  useEffect(() => {
    //fetch request here
    fetch(`https://home-gradebook.herokuapp.com/get-student-grades/${id}`, {
      method: "GET",
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("get student grades response", response);
      //once response received, navigate back to home page
      setStudentGrades(response)
    })
  }, [setStudentGrades]);


  return (
    <div>
      {cookies && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>
        Welcome, {cookies.email}
      </div>}
      <TableContainer sx={{width: '100vw', height: '70vh'}} component={Paper}>
        <div style={{width: '60vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2, marginBottom: 0 }}>
          <h2>Student's Grades</h2>
          <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/`}>
            <Button variant="outlined" sx={{fontWeight: 'bold'}}>Back to Classes</Button>
          </Link>
        </div>
        <Table sx={{ marginTop: 0, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Grade Id</StyledTableCell>
              <StyledTableCell align="center">Class Id</StyledTableCell>
              <StyledTableCell align="center">Assignment Name</StyledTableCell>
              <StyledTableCell align="center">Assignment Type</StyledTableCell>
              <StyledTableCell align="center">Grade</StyledTableCell>
              <StyledTableCell align="center">Comments</StyledTableCell>
            </TableRow>
          </TableHead>

          {studentGrades && <TableBody>
            {studentGrades.map((grade, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell sx={{width: '5vw'}} align="center">{grade.gradeId}</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                  {grade.class_id}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                  {grade.assignment_name}
                </StyledTableCell>
                <StyledTableCell sx={{width: '5vw'}} align="center">{grade.assignment_type}</StyledTableCell>
                <StyledTableCell sx={{width: '5vw'}} align="center">
                  {grade.grade}
                </StyledTableCell>
                <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">{grade.comments}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>}
        </Table>
      </TableContainer>
      <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <div style={{width: '60vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2, marginBottom: 0 }}>
        <h2>Student Details</h2>
      </div>
      <Table sx={{ marginTop: 0, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Student Id</StyledTableCell>
            <StyledTableCell align="center">Student Name</StyledTableCell>
            <StyledTableCell align="center">Birthday</StyledTableCell>
            <StyledTableCell align="center">Emergency Contact</StyledTableCell>
            <StyledTableCell align="center">Accomodations</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>

        {studentInfo && <TableBody>
            <StyledTableRow>
              <StyledTableCell sx={{width: '5vw'}} align="center">{studentInfo.id}</StyledTableCell>
              <StyledTableCell align="center" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                {studentInfo.user_name}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                {studentInfo.birthday}
              </StyledTableCell>
              <StyledTableCell sx={{width: '5vw'}} align="center">{studentInfo.emergency_contact}</StyledTableCell>
              <StyledTableCell sx={{width: '5vw'}} align="center">
                {studentInfo.accomodations}
              </StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">{studentInfo.assignment_description}</StyledTableCell>
              
            </StyledTableRow>
        </TableBody>}
      </Table>
        <Button variant="outlined" sx={{fontWeight: 'bold'}}>
          <AddIcon fontSize="small" sx={{color: 'blue'}}/>
          Update Student Details
        </Button>
      </TableContainer>
      </div>
  )
}

export default DetailsStudent