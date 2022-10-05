import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TextField, Container } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(3, 190, 253, .6)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const MapStudentGrades= (props) => {
  const {id, jwt, numAssign, assignList} = props;
  const [studentGrades, setStudentGrades] = useState([]);

  useEffect(() => {
    //fetch request here
    fetch(`http://localhost:9000/get-student-grades/${id}`, {
      method: "GET",
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+jwt
      }
    })
    .then(res=>res.json())
    .then(response=>{
      console.log("get map student grades response", response);
      //once response received, navigate back to home page
      setStudentGrades(response)
    })
  }, [setStudentGrades]);

  if(studentGrades.length === numAssign){
    return(
      <>
        {studentGrades.map((grade, index)=>{
          console.log("grade ", grade, "at index: ", index)
          if(grade){
            return(
            <StyledTableCell key={`st${index}`} sx={{width: '3vw'}} align="center">
              <Link style={{textDecoration: 'none'}} to={`/grade/${grade.gradeId}`}>  
                {grade.grade}
              </Link>
            </StyledTableCell>
          )};
        })}
      </>
    )
  }else if((numAssign - studentGrades.length) > 0){/**end of first if return */
    let zipArray = studentGrades.map(grade=>grade);
    for(let i=zipArray.length-1; i<numAssign; i++){
      zipArray[i] = {zipElement: true};
    };
    return (
      <>
        {zipArray.map((element, index)=>{
          if(element.zipElement===true){
            return(
              <StyledTableCell key={`stt${index}`} sx={{width: '3vw'}} align="center">
                <TextField size="small" sx={{width: '3vw'}} assign-id={assignList[index].id}>

                </TextField>
              </StyledTableCell>
            )
          }else{
            return(
              <StyledTableCell key={`st${index}`} sx={{width: '3vw'}} align="center">
              <Link style={{textDecoration: 'none'}} to={`/grade/${element.gradeId}`}>  
                {element.grade}
              </Link>
            </StyledTableCell>
            )
          }
        })}
      </>
    )
  }
}

export default MapStudentGrades