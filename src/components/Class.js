import React, {useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const Class = (props) => {
  const {user, classes} = props;
  const {id} = useParams();
  const [students, setStudents] = useState([]);
  const [loopCounter, setLoopCounter] = useState(1);
  const trimdJWT = user.userJWT.slice(1, user.userJWT.length-1);
  let currentClass = classes.find(clas => {
    return clas.id === parseInt(id)
  });
  console.log("currentClass", currentClass);

  const fetchStudents = () => {
    fetch(`http://localhost:9000/view-class-students/${id}`,{
      method: 'GET',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("fetchStudents response", response);
      setStudents(response);
    })
  };
  if(students.length === 0 && loopCounter === 1){
    setLoopCounter(2);
    fetchStudents();
    console.log("students state", students);
  };

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100vw'}}>
    {user && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {user.email}</div>}
    <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <h2>{currentClass.class_name} Roster</h2>
      <Table sx={{ marginTop: 3, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Id</StyledTableCell>
            <StyledTableCell align="center">Student Name</StyledTableCell>
            <StyledTableCell align="center">GPA</StyledTableCell>
            <StyledTableCell align="center">Turned In</StyledTableCell>
            <StyledTableCell align="center">Assignments Missing</StyledTableCell>
          </TableRow>
        </TableHead>

        {students.length > 0 && <TableBody>
          {students.map((student, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell sx={{width: '5vw'}} align="center">{student.id}</StyledTableCell>
              <StyledTableCell align="center" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                <Link to={`/student-grade/${student.id}`}>{student.user_name}</Link>
              </StyledTableCell>
              <StyledTableCell sx={{width: '5vw'}} align="center">{student.user_name}</StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">{student.user_name}</StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '10vw', maxWidth: '30vw'}} align="center">{student.user_name}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>}
      </Table>
      </TableContainer>
    </div>
  )
}

export default Class