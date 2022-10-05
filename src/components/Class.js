import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import cookie from 'cookie';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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

const buttonStyles = {
  color: 'black', 
  fontWeight: 'medium', 
  cursor: "pointer", 
  border: "2px solid grey", 
  borderRadius: '3px'
}

const Class = () => {
  const {id} = useParams();
  const cookies = cookie.parse(document.cookie);
  const addStudentLink = `/add-student/${id}`;
  const [students, setStudents] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const trimdJWT = cookies["userJWT"];
  const [currentClass, setCurrentClass] = useState({});
  const [showWarning, setShowWarning] = useState(false);

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
  }, [setStudents])

  const removeStudent = (studentRemoveId) => {

    const studentObj = {
      student_id: studentRemoveId
    }
    console.log(`removing student ID: ${studentRemoveId} from class ${currentClass.class_name}`)
    fetch(`http://localhost:9000/remove-student/${currentClass.id}`,{
      method: 'DELETE',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      },
      body: JSON.stringify(studentObj)
    })
    .then(res=>console.log(res.status))
    .then(response=>{
      setDeleteId(null);
    })
  };

  const hoverStyle = e => e.target.style.backgroundColor='grey';
  const unHoverStyle = e => e.target.style.backgroundColor= null;

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100vw'}}>
    {cookies.loggedIn && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <div style={{width: '60vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2, marginBottom: 0 }}>
        <h2>{currentClass.class_name} Roster</h2>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to="/"><Button variant="outlined" sx={{fontWeight: 'bold'}}>Classes</Button></Link>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/assignments/${id}`}><Button variant="outlined" sx={{fontWeight: 'bold'}}>Assignments</Button></Link>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/grades/${id}`}><Button variant="outlined" sx={{fontWeight: 'bold'}}>Grades</Button></Link>
      </div>
      <Table sx={{ marginTop: 0, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Student Id</StyledTableCell>
            <StyledTableCell align="center">Student Name</StyledTableCell>
            <StyledTableCell align="center">GPA</StyledTableCell>
            <StyledTableCell align="center">Turned In</StyledTableCell>
            <StyledTableCell align="center">Assignments Missing</StyledTableCell>
            <StyledTableCell align="center">Remove</StyledTableCell>
          </TableRow>
        </TableHead>

        {students.length > 0 && <TableBody>
          {students.map((student, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell sx={{width: '5vw'}} align="center">{student.id}</StyledTableCell>
              <StyledTableCell align="center" sx={{fontWeight: 'bold', width: '8vw'}}scope="row">
                <Link to={`/details-student/${student.id}`}>{student.user_name}</Link>
              </StyledTableCell>
              <StyledTableCell sx={{width: '5vw'}} align="center">{student.user_name}</StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">{student.user_name}</StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '10vw', maxWidth: '30vw'}} align="center">{student.user_name}</StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">
                <button 
                  style={buttonStyles}
                  onMouseEnter={hoverStyle}
                  onMouseLeave={unHoverStyle}
                  onClick={()=>{
                    setShowWarning(true);
                    setDeleteId(student.id);
                  }}
                >
                  X
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>}
      </Table>
      <Link style={{textDecoration: 'none'}} to={addStudentLink}>
        <Button variant="outlined" sx={{fontWeight: 'bold'}}>
          <AddIcon fontSize="small" sx={{color: 'blue'}}/>
          Add Student
        </Button>
      </Link>
      </TableContainer>
      {showWarning && <Alert severity="warning" sx={{zIndex: 200, left: '28%', top: '38%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '39vw', borderRadius: '10px'}}>
        <AlertTitle sx={{fontWeight: 'bold'}}>Warning</AlertTitle>
        You are about to permanently remove this student from the class — <strong>Are you sure?</strong>
          <div>
            <Button variant="contained" sx={{display: 'inline-block', marginRight: 10}}
              onClick={()=>{
                removeStudent(deleteId); 
                setShowWarning(false);
                }
              }
            >
              Yes
            </Button>
            <Button variant="contained" sx={{display: 'inline-block',}}
              onClick={()=>{
                // setDeleteId(null);
                setShowWarning(false);
                }
              }
            >
              No
            </Button>
          </div>
        </Alert>}
    </div>
  )
}

export default Class