import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import cookie from 'cookie';
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

const Assignments = (props) => {
  const {user, classes} = props;
  const {id} = useParams();
  const cookies = cookie.parse(document.cookie);
  const [assignments, setAssignments] = useState([]);
  const [loopCounter, setLoopCounter] = useState(1);
  const trimdJWT = cookies["userJWT"];
  // let currentClass = classes.find(clas => {
  //   return clas.id === parseInt(id)
  // });
  const [currentClass, setCurrentClass] = useState({});
  console.log("currentClass", currentClass);

  useEffect(()=> {
    fetch(`http://localhost:9000/view-class/${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>setCurrentClass(response[0]))
    console.log("currentClass after set", currentClass)
  }, [setCurrentClass]);

  useEffect(() => {
    fetch(`http://localhost:9000/assignments/${id}`,{
      method: 'GET',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("fetchAssignments response", response);
      setAssignments(response);
    })
  }, []);

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100vw'}}>
    {user && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <div style={{width: '60vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2, marginBottom: 0 }}>
        <h2>{currentClass.class_name} Assignments</h2>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/class/${id}`}><Button variant="outlined" sx={{fontWeight: 'bold'}}>Roster</Button></Link>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/assignments/${id}`}><Button variant="outlined" sx={{fontWeight: 'bold'}}>Assignments</Button></Link>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/grades/${id}`}><Button variant="outlined" sx={{fontWeight: 'bold'}}>Grades</Button></Link>
      </div>
      <Table sx={{ marginTop: 0, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Assignment Id</StyledTableCell>
            <StyledTableCell align="center">Assignment Name</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
          </TableRow>
        </TableHead>

        {assignments.length > 0 && <TableBody>
          {assignments.map((assignment, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell sx={{width: '5vw'}} align="center">{assignment.id}</StyledTableCell>
              <StyledTableCell align="center" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                <Link to={`/assignment/${assignment.id}`}>{assignment.assignment_name}</Link>
              </StyledTableCell>
              <StyledTableCell sx={{width: '5vw'}} align="center">{assignment.assignment_type}</StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">{assignment.assignment_description}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>}
      </Table>
      <Link style={{textDecoration: 'none'}} to={`/add-assignment/${id}`}>
        <Button variant="outlined" sx={{fontWeight: 'bold'}}>
          <AddIcon fontSize="small" sx={{color: 'blue'}}/>
          Add Assignment
        </Button>
      </Link>
      </TableContainer>
    </div>
  )
}

export default Assignments