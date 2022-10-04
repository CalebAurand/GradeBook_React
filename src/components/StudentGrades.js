import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import cookie from 'cookie';
import {Link} from 'react-router-dom';
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

const StudentGrades = (props) => {
  const {id} = useParams();
  const cookies = cookie.parse(document.cookie);
  const [grades, setGrades] = useState([]);
  const trimdJWT = cookies.userJWT;

  useEffect(()=>{
    fetch(`http://localhost:9000/student-grades/${id}`,{
      method: 'GET',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("fetchGrades response", response);
      setGrades(response);
    })
  }, [id, trimdJWT]);
  
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100vw'}}>
    {cookies.loggedIn && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <h2>{/*currentClass.class_name*/} Grades</h2>
      <Table sx={{ marginTop: 3, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '70vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Assignment</StyledTableCell>
            <StyledTableCell align="center">Assignment Type</StyledTableCell>
            <StyledTableCell align="center">Grade</StyledTableCell>
            <StyledTableCell align="center">Assignment Description</StyledTableCell>
          </TableRow>
        </TableHead>

        {grades.length > 0 && <TableBody>
          {grades.map((grade, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                <Link to={`/student-grade/${grade.id}`}>{grade.assignment_name}</Link>
              </StyledTableCell>
              <StyledTableCell sx={{width: '5vw'}} align="center">{grade.assignment_type}</StyledTableCell>
              <StyledTableCell sx={{width: '5vw'}} align="center">{grade.grade}</StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '15vw', maxWidth: '30vw'}} align="left">{grade.assignment_description}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>}
      </Table>
      </TableContainer>
    </div>
  )
}

export default StudentGrades