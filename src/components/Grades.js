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

const Grades = (props) => {
  const {user, classes} = props;
  const {id} = useParams();
  const cookies = cookie.parse(document.cookie);
  const [grades, setGrades] = useState([]);
  const [assignmentList, setAssignmentList] = useState([]);
  const [student_grades, setStudentGrades] = useState([]);
  const trimdJWT = cookies.userJWT;
  const [currentClass, setCurrentClass] = useState({});



  useEffect(() => {
    fetch(`http://localhost:9000/grades/${id}`,{
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
      let copyGrades = response;

      let studentGradesArray = [];
      let assignmentNames = [];
      let studentCounter = 0;
      let initial;
      console.log("copy of grades in useEffect", copyGrades)
      for(let i = 0; i < copyGrades.length; i++){
        if(i === 0){
          //set initial student's id
          initial = copyGrades[0].user_name;
          //map through grades, put assignment names into an array
          //push that assignment names array to first position of studentGradesArray
          
          copyGrades.map(grade=>{
            if(grade.user_name === initial){
                assignmentNames.push(grade.assignment_name);
              }else{
                return;
              }
            });
          console.log("initial student", initial);
          studentGradesArray.push([initial]);

        };
        if(initial === copyGrades[i].user_name){
          studentGradesArray[studentCounter].push({gradeId: copyGrades[i].gradeId, grade: copyGrades[i].grade});
        }else{
          studentCounter++;
          initial = copyGrades[i].user_name;
          studentGradesArray.push([initial])
          studentGradesArray[studentCounter].push({gradeId: copyGrades[i].gradeId, grade: copyGrades[i].grade});
        };
        //if on second iteration check to see if student is the same,if so add grade to student's grades array
        //if not same student, start a new usestate for next student
      };
      console.log("student grades Array from grades", studentGradesArray);
      setStudentGrades(studentGradesArray);
      setAssignmentList(assignmentNames);
    })

    return () => {
      setStudentGrades([])
      setAssignmentList([])
    }
  }, [id, trimdJWT]);

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

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100vw'}}>
    {user && <div style={{backgroundColor: '#D3CFFD', fontWeight: 'bold', fontSize: '16pt', textAlign: 'center', padding: '2vh', width: '100vw' }}>Welcome, {cookies.email}</div>}
    <TableContainer sx={{width: '100vw', height: '100vh'}} component={Paper}>
      <div style={{width: '60vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2, marginBottom: 0 }}>
        <h2>{currentClass.class_name} Grades</h2>
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
                <StyledTableCell key={index}>{assignment}</StyledTableCell>
              )
            })}
            </>
          </TableRow>
          <TableRow>
            <StyledTableCell align="center" sx={{lineHeight: '.1rem'}}>Student Name</StyledTableCell>
            {assignmentList.map((grade, index)=>{
              return (
                <StyledTableCell key={index}></StyledTableCell>
              )
            })}
          </TableRow>
        </TableHead>

        {student_grades.length > 0 && <TableBody>
          {student_grades.map((student, index) => {
            //in each row
            //grab first/next student from grades
            //map out each grade for matching that student id
            //once a new student id is reached then return/break
            return(
            <StyledTableRow key={index}>
              {student.map((grade, idx)=>{
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
            </StyledTableRow>
          )})}
        </TableBody>}
      </Table>
      </TableContainer>
    </div>
  )
}

export default Grades