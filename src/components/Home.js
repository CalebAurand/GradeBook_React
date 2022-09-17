import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
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


export default function Home(props) {
  const { user, setClasses, classes } = props;
  const [localClasses, setLocalClasses] = useState([]);
  const [studentCount, setStudentCount] = useState([]);
  const [loopCounter, setLoopCounter] = useState(1);
  
  const runFetchClasses = async () => {
    const trimdJWT = user.userJWT.slice(1, user.userJWT.length-1);
    fetch('http://localhost:9000/view-classes',{
      method: 'GET',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("fetchClasses response", response);
      setLocalClasses(response);
      setClasses(response);
    })
  }

  const fetchStudentCount = () => {
    const trimdJWT = user.userJWT.slice(1, user.userJWT.length-1);
    fetch('http://localhost:9000/view-count-classes',{
      method: 'GET',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("fetch student count response", response);
      setStudentCount(response);
    })
  }

  if(localClasses.length === 0 && loopCounter === 1){
    setLoopCounter(2);
    runFetchClasses();
    fetchStudentCount();
  }else if(localClasses.length >= 1 && loopCounter === 2){
    setLoopCounter(3);
    setClasses(localClasses);
  };

  console.log("home component global classes", classes);
  console.log("local classes", localClasses);
  console.log("student Count", studentCount);

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100vw'}}>
    {user && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {user.email}</div>}
    <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <h2>Classes</h2>
      <Table sx={{ marginTop: 3, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Class Name</StyledTableCell>
            <StyledTableCell sx={{maxWidth: 20}} align="center">Subject</StyledTableCell>
            <StyledTableCell align="center"># of Students</StyledTableCell>
          </TableRow>
        </TableHead>

        {localClasses.length > 0 && <TableBody>
          {localClasses.map((classT, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" align="center" sx={{fontWeight: 'bold', width: '8.2vw'}}scope="row">
                <Link to={`/class/${classT.id}`}>{classT.class_name}</Link>
              </StyledTableCell>
              <StyledTableCell sx={{width: '6vw', maxWidth: '25vw'}} align="center">{classT.class_subject}</StyledTableCell>
              <StyledTableCell sx={{width: '6vw', minWidth: '7vw'}} align="center">{`${classT.count}`}</StyledTableCell>
            </StyledTableRow>
        ))}
        </TableBody>}
      </Table>
      <Link to="/new-class">
      <Button variant="outlined" sx={{fontWeight: 'bold'}}>
        <AddIcon fontSize="small" sx={{color: 'blue'}}/>
        Add Class
      </Button>
      </Link>
      </TableContainer>
    </div>
  );
}




/**
 * previous width of the classes table was '70vw'
 * <TableContainer sx={{width: '30vw'}} component={Paper}>
        <h2>Assignments</h2>
      <Table sx={{ marginTop: 3, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '10vw', minWidth: 100 }} aria-label="customized table">
        <TableHead>
        <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell sx={{maxWidth: 20}} align="center">Due</StyledTableCell>
            
            {/* {loggedInBool && <StyledTableCell align="center">Delete</StyledTableCell>} *}
            </TableRow>
            </TableHead>
    
            <TableBody>
              {listings.map((list, index) => (
                <StyledTableRow key={list.id}>
                  <StyledTableCell component="th" sx={{fontWeight: 'bold', width: '8.2vw'}}scope="row">
                    <Link to={`/details/${list.id}`}>{list.name}</Link>
                  </StyledTableCell>
                  <StyledTableCell sx={{width: '6vw', minWidth: '7vw'}} align="right">{`${list.hours.open} - ${list.hours.close}`}</StyledTableCell>
                  {/* {loggedInBool && <StyledTableCell align="center"><DeleteIcon onClick={()=>removeListing(index)} sx={{color: 'red', cursor: 'pointer'}}></DeleteIcon></StyledTableCell>} *}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */