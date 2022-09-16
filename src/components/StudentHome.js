import React, {useState} from 'react';
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


export default function StudentHome(props) {
  const {user, setClasses, classes} = props;
  const [localClasses, setLocalClasses] = useState([]);
  const [loopCounter, setLoopCounter] = useState(1);

  const trimdJWT = user.userJWT.slice(1, user.userJWT.length-1);

  const runFetchClasses = async ()=>{
    fetch('http://localhost:9000/student-classes',{
      method: 'GET',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      setLocalClasses(response);
    })
  }
  
  if(localClasses.length === 0 && loopCounter === 1){
    setLoopCounter(2);
    runFetchClasses();
  }else if(localClasses.length >= 1 && loopCounter === 2){
    setLoopCounter(3);
    setClasses(localClasses);
  };

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100vw'}}>
    {user && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {user.email}</div>}
    <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <h2>Classes</h2>
      <Table sx={{ marginTop: 3, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '50vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Class Name</StyledTableCell>
            <StyledTableCell sx={{maxWidth: 20}} align="center">Subject</StyledTableCell>
            <StyledTableCell align="center">Teacher Name</StyledTableCell>
          </TableRow>
        </TableHead>

        {localClasses.length > 0 && <TableBody>
          {localClasses.map((classT, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" sx={{fontWeight: 'bold', width: '8.2vw'}}scope="row">
                <Link to={`/student-grades/${classT.id}`}>{classT.class_name}</Link>
              </StyledTableCell>
              <StyledTableCell sx={{maxWidth: '25vw'}} align="left">{classT.class_subject}</StyledTableCell>
              <StyledTableCell sx={{width: '6vw', minWidth: '7vw'}} align="right">{`${classT.user_name}`}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>}
      </Table>
      </TableContainer>
    </div>
  );
}




