import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
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
  const classId = id;
  const navigate = useNavigate();
  const cookies = cookie.parse(document.cookie);
  const [assignmentList, setAssignmentList] = useState([]);
  const [assignmentsObjects, setAssignmentsObjects] = useState([]);
  const [studentsArray, setStudentsArray] = useState([]);
  const [postCounter, setPostCounter] = useState(1);  
  const trimdJWT = cookies.userJWT;

  /*************************************
   * create a function that handles the change for each text field
   * and tracks the changes in state for each change with the info...
   * {studentId, assignmentId, grade to be added}
   * ...those are the 3 data points needed to insert new grades into the DB
   */

  //set state template for student id, and empty grades array

  /**create a function to handle submit of form, and get all of the <MapStudentGrades> grades into newGradesInfo */
  const handleGrade = (gradeObj)=>{
      console.log("handle gradeObj", gradeObj);
      addNewGrade(gradeObj);
  }

   /**My alteration
    * [
    *   {
    *   studentId: 7,
    *   grades: [
    *     {assignId: 17, grade: 98},
    *     {assignId: 18, grade: 90},
    *     {assignId: 19, grade: 89},
    *     {assignId: 20, grade: 87}
    *     ]
    *   },
    *   {studentId: 3,
    *   grades: [
    *     {assignId: 17, grade: 87},
    *     {assignId: 18, grade: 85},
    *     {assignId: 19, grade: 97},
    *     {assignId: 20, grade: 75},
    *     ]
    *   }
    * ]
    */
  /**claytons suggestion
   * {
      assignmentId: 17,
      grades: [ 
         {studentId: 34, grade: 98},
         {studentId: 35, grade: 90},
         {studentId: 36, grade: 72},
         {studentId: 36, grade: 81},
      ]
    }  
*/

  const addNewGrade = (gradeObj2) => {
      console.log("posting Object is ", gradeObj2);

    fetch(`http://localhost:9000/add-grade/`,{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+trimdJWT
      },
      body: JSON.stringify(gradeObj2)
    })
    .then(res=>res.text())
    .then(response=>{
      console.log("create new assignment response", response);
      //once response received, navigate back to home page
      // navigate(`/grades/${classId}`);
    })
  }

  /***create a function that handles the "save" POST fetch request for all the new grades */

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
      setAssignmentList(response);
      let assignments = response;
      let assignObjs = [];
      for(const assgn of assignments){
        assignObjs.push({
          assignmentId: assgn.id,
          grade: null
        })
      }
      setAssignmentsObjects(assignObjs);
    })
  }, []);

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
            return(
            <StyledTableRow key={index}>
              <StyledTableCell sx={{width: '3vw'}} align="center">{student.user_name}</StyledTableCell>
                <MapStudentGrades id={student.id} jwt={trimdJWT} numAssign={assignmentList.length} assignList={assignmentList} setGrades={handleGrade} assignObjs={assignmentsObjects}/>
            </StyledTableRow>
          )})}
        </TableBody>}
      </Table>
      <Button id="save-grades-button" variant="outlined" sx={{fontWeight: 'bold'}}>Save Grades</Button>
      </TableContainer>
    </div>
  )
}

export default Grades