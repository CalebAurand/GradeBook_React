import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';
import cookie from 'cookie';
import { styled } from '@mui/material/styles';
// import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

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

const Students = (props) => {
  const {user} = props;
  const cookies = cookie.parse(document.cookie);
  const [students, setStudents] = useState([]);
  const trimdJWT = cookies["userJWT"];

  useEffect (() => {
    fetch('https://home-gradebook.herokuapp.com/view-students',{
      method: 'GET',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      setStudents(response);
    })
  }, []);

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100vw'}}>
    {user && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <h2>Students</h2>
      <Table sx={{ marginTop: 3, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Student Id</StyledTableCell>
            <StyledTableCell sx={{maxWidth: 20}} align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Student Email</StyledTableCell>
          </TableRow>
        </TableHead>

        {students.length > 0 && <TableBody>
          {students.map((student, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell sx={{width: '6vw', maxWidth: '25vw'}} align="center">{student.id}</StyledTableCell>
              <StyledTableCell component="th" align="center" sx={{fontWeight: 'bold', width: '8.2vw'}}scope="row">{student.user_name}
              </StyledTableCell>
              <StyledTableCell sx={{width: '6vw', minWidth: '7vw'}} align="center">{student.email}</StyledTableCell>
            </StyledTableRow>
        ))}
        </TableBody>}
      </Table>
      {/* <Link to="/new-student">
      <Button variant="outlined" sx={{fontWeight: 'bold'}}>
        <AddIcon fontSize="small" sx={{color: 'blue'}}/>
        Create Student
      </Button>
      </Link> */}
      </TableContainer>
    </div>
    )
}

export default Students