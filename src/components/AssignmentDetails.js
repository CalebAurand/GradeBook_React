import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom'
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

const AssignmentDetails = (props) => {
  const [classId, setClassId] = useState();
  const [assignmentInfo, setAssignmentInfo] = useState();
  const {id} = useParams();
  const navigate = useNavigate();
  const cookies = cookie.parse(document.cookie);
  const trimdJWT = cookies.userJWT;

  useEffect(() => {
    //fetch request here
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

  const deleteAssignment = (id) => {
    console.log("going to delete assignment, id is: ", id);
  }

  return (
    <div>
      {cookies && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
      <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <div style={{width: '60vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2, marginBottom: 0 }}>
        <h2> Assignment Details</h2>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/class/${classId}`}><Button variant="outlined" sx={{fontWeight: 'bold'}}>Roster</Button></Link>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/assignments/${classId}`}><Button variant="outlined" sx={{fontWeight: 'bold'}}>Assignments</Button></Link>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/grades/${classId}`}><Button variant="outlined" sx={{fontWeight: 'bold'}}>Grades</Button></Link>
      </div>
      <Table sx={{ marginTop: 0, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Assignment Id</StyledTableCell>
            <StyledTableCell align="center">Assignment Name</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>

        {assignmentInfo && <TableBody>
            <StyledTableRow>
              <StyledTableCell sx={{width: '5vw'}} align="center">{assignmentInfo.id}</StyledTableCell>
              <StyledTableCell align="center" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                {assignmentInfo.assignment_name}
              </StyledTableCell>
              <StyledTableCell sx={{width: '5vw'}} align="center">{assignmentInfo.assignment_type}</StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">{assignmentInfo.assignment_description}</StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">
                <DeleteIcon sx={{color: "red", cursor: "pointer"}} 
                  onClick={()=>deleteAssignment(assignmentInfo.id)}
                />
              </StyledTableCell>
            </StyledTableRow>
        </TableBody>}
      </Table>
      {assignmentInfo && <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/update-assignment/${assignmentInfo.id}`}>
        <Button variant="outlined" sx={{fontWeight: 'bold'}}>
          <AddIcon fontSize="small" sx={{color: 'blue'}}/>
          Update Assignment
        </Button>
      </Link>}
      </TableContainer>
      </div>
  )
}

export default AssignmentDetails