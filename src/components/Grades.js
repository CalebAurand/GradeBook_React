import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import cookie from 'cookie';
import ClassHeaderName from './utilities/ClassHeaderName';
import MapStudentGrades from './utilities/MapStudentGrades';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

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

const Grades = () => {
  const {id} = useParams();
  const cookies = cookie.parse(document.cookie);
  const [assignmentList, setAssignmentList] = useState([]);
  const [studentsArray, setStudentsArray] = useState([]);
  const trimdJWT = cookies.userJWT;

  useEffect(()=>{
    fetch(`http://localhost:9000/view-class-students/${id}`,{
      method: 'GET',
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("second student fetch response", response);
      setStudentsArray(response);
    })
  }, [setStudentsArray])

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
      setAssignmentList(response);
    })
  }, []);
  
  console.log("studentsArray", studentsArray);
  console.log("assignment List", assignmentList);

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100vw'}}>
    {cookies.email && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <div style={{width: '60vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2, marginBottom: 0 }}>
        <ClassHeaderName jwt={trimdJWT} id={id} nextText={"Grades"}/>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/class/${id}`}>
          <Button variant="outlined" sx={{fontWeight: 'bold'}}>Roster</Button>
        </Link>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/assignments/${id}`}>
          <Button variant="outlined" sx={{fontWeight: 'bold'}}>Assignments</Button>
        </Link>
        <Link style={{textDecoration: 'none', marginLeft: '5px', marginRight: '5px'}} to={`/grades/${id}`}>
          <Button variant="outlined" sx={{fontWeight: 'bold'}}>Grades</Button>
        </Link>
      </div>
      <Table sx={{ marginTop: 0, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto', width: '60vw', minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Assignments</StyledTableCell>
            <>
            {assignmentList.map((assignment, index)=>{
              return (
                <StyledTableCell key={`a${index}`}>{assignment.assignment_name}</StyledTableCell>
              )
            })}
            </>
          </TableRow>
          <TableRow>
            <StyledTableCell align="center" sx={{minWidth: '115px', lineHeight: '.1rem'}}>Student Name</StyledTableCell>
            {assignmentList.map((thing, index)=>{
              return (
                <StyledTableCell key={`at${index}`}></StyledTableCell>
              )
            })}
          </TableRow>
        </TableHead>

        {studentsArray && <TableBody>
          {studentsArray.map((student, index) => {
            //in each row
            //grab first/next student from grades
            //map out each grade for matching that student id
            //once a new student id is reached then return/break
            return(
            <StyledTableRow key={index}>
              <StyledTableCell sx={{width: '3vw'}} align="center">{student.user_name}</StyledTableCell>
              <MapStudentGrades id={student.id} jwt={trimdJWT} numAssign={assignmentList.length} assignList={assignmentList}/>
            </StyledTableRow>
          )})}
        </TableBody>}
      </Table>
      </TableContainer>
    </div>
  )
}

export default Grades


/**
 * {student.map((grade, idx)=>{
                if(idx === 0){
                  return(
                    <StyledTableCell key={index} sx={{width: '3vw'}} align="center">{grade}</StyledTableCell>
                  )
                }else{
                  return(
                    <>
                      <StyledTableCell key={grade.gradeId} sx={{width: '3vw'}} align="center">
                        <Link style={{textDecoration: 'none'}} to={`/grade/${grade.gradeId}`}>  {grade.grade}
                        </Link>
                      </StyledTableCell>
                    </>
                )}
              })}
 */