import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
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

const GradeDetails = (props) => {
  const [classId, setClassId] = useState();
  const [gradeInfo, setGradeInfo] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();
  const cookies = cookie.parse(document.cookie);
  const trimdJWT = cookies.userJWT;

  useEffect(() => {
    //fetch request here
    fetch(`https://home-gradebook.herokuapp.com/grade_details/${id}`, {
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
      setClassId(response[0].class_id);
    })
  }, [id]);

  const deleteGrade = (grade_id) => {
    console.log("going to delete grade, id is: ", grade_id);

    fetch(`https://home-gradebook.herokuapp.com/delete-grade/${grade_id}`,{
      method: 'DELETE',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>console.log(res.status))
    .then(response=>{
      console.log("delete assignment response", response);
      setDeleteId(null);
      navigate(`/grades/${classId}`);
    })
  }

  return (
    <div>
      {cookies && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
      <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <div style={{width: '60vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2, marginBottom: 0 }}>
        <h2>Grade Details</h2>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/class/${classId}`}>
          <Button variant="outlined" sx={{fontWeight: 'bold'}}>Roster</Button>
        </Link>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/assignments/${classId}`}>
          <Button variant="outlined" sx={{fontWeight: 'bold'}}>Assignments</Button>
        </Link>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/grades/${classId}`}>
          <Button variant="outlined" sx={{fontWeight: 'bold'}}>Grades</Button>
        </Link>
      </div>
      <Table sx={{ marginTop: 0, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Grade Id</StyledTableCell>
            <StyledTableCell align="center">Student Name</StyledTableCell>
            <StyledTableCell align="center">Assignment Name</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Grade</StyledTableCell>
            <StyledTableCell align="center">Comments</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
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
              <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">{gradeInfo.comments}</StyledTableCell>
              <StyledTableCell sx={{minWidth: '5vw', width: '5vw', maxWidth: '30vw'}} align="center">
                <DeleteIcon sx={{color: "red", cursor: "pointer"}} 
                  onClick={()=>{
                  setDeleteId(gradeInfo.gradeId);
                  setShowWarning(true);
                 }}/>
              </StyledTableCell>
            </StyledTableRow>
        </TableBody>}
      </Table>
      <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/update-grade/${id}`}>
          <Button variant="outlined" sx={{fontWeight: 'bold'}}>
            <AddIcon fontSize="small" sx={{color: 'blue'}}/>
            Update Grade
          </Button>
        </Link>
      </TableContainer>
      {showWarning && <Alert severity="warning" sx={{zIndex: 200, left: '28%', top: '38%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '39vw', borderRadius: '10px'}}>
        <AlertTitle sx={{fontWeight: 'bold'}}>Warning</AlertTitle>
        The DELETE you are about to perform is permanent — <strong>Are you sure?</strong>
          <div>
            <Button variant="contained" sx={{display: 'inline-block', marginRight: 10}}
              onClick={()=>{
                deleteGrade(deleteId); 
                setShowWarning(false);
                }
              }
            >
              Yes
            </Button>
            <Button variant="contained" sx={{display: 'inline-block',}}
              onClick={()=>{
                setDeleteId(null);
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

export default GradeDetails