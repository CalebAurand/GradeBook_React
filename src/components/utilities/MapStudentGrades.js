import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TextField } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(3, 190, 253, .6)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const MapStudentGrades = (props) => {
  const {id, jwt, numAssign, assignList, assignObjs} = props;
  const [studentGrades, setStudentGrades] = useState([]);
  const [gradeInfo, setGradeInfo] = useState({
    studentId: id,
    grades: []
  });

  console.log("assignList", assignList)

  useEffect(() => {
    //fetch request here
    fetch(`https://home-gradebook.herokuapp.com/get-student-grades/${id}`, {
      method: "GET",
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer "+jwt
      }
    })
    .then(res=>res.json())
    .then(response=>{
      //once response received, navigate back to home page
      console.log("studentGrades response", response);
      setStudentGrades(response)

    })

    const saveButton = document.getElementById('save-grades-button');
    saveButton.addEventListener('click', ()=>handleSave())

    return() =>{
      saveButton.removeEventListener('click', ()=>handleSave())
    }

  }, []);

  const handleTextChange = (e, assign_id, assign_name, student_id) => {
    const { value } = e.target;
    let newValue = parseInt(value);
    if(newValue === null || newValue === NaN || newValue === undefined){
      return;
    }
    
    setGradeInfo((prevState)=>{
      //use copystate to find the el that matches gradeid && student id
      let copyState = prevState;
      if(copyState.grades.length === numAssign){
        for(const grade of copyState.grades){
          if(grade.assignmentId === assign_id){
            grade.grade = newValue
          }
        }
      }else if(copyState.grades.length > 0 && copyState.grades.length < numAssign){
        let gradeEl = copyState.grades.find((el)=>el.assignmentId === assign_id);
        if(gradeEl != undefined){
          let gradeIndex = copyState.grades.indexOf(gradeEl);
          copyState.grades[gradeIndex].grade=newValue;
        }else{
          copyState.grades = [...prevState.grades, {
            assignmentId: assign_id,
            grade: newValue
          }]
        };
      }else{
        if(newValue){
          copyState.grades = [...prevState.grades, {
            assignmentId: assign_id,
            grade: newValue
          }]
        };
      };
      //store that el in variable copyEl
      //alter copyEl[name] = newValue
      //log copyEl and copyState to ensure alterations have stuck
      //return copyState
      return(copyState);
    });
    //then set newGrades state to handle change to its state
  }

  const handleSave = ()=>{
    console.log("submitting gradeInfo", gradeInfo);
    
    props.setGrades(gradeInfo);
  };

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
    let zipArray = [];
    assignList.forEach((assignment, index)=>{
      let foundEl = studentGrades.find((grade)=>grade.assignment_id === assignment.id);
      if(foundEl){
        zipArray[index] = foundEl;
      }else{
        zipArray[index] = {zipElement: true};
      }
    })
    // let zipArray = studentGrades.map(grade=>grade);

    // for(let i=zipArray.length-1; i<numAssign; i++){
    //   zipArray[i] = {zipElement: true};
    // };
    return (
      <>
        {zipArray.map((element, index)=>{
          if(element.zipElement===true){
            return(
              <StyledTableCell key={`stt${index}`} sx={{width: '3vw'}} align="center">
                
                <TextField size="small" sx={{width: '3vw'}} assign_id={assignList[index].id} student_id={props.id} name="grade" onBlur={(e)=>handleTextChange(e, assignList[index].id, assignList[index].assignment_name, props.id)} >
                
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

