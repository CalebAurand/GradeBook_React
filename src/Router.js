import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import cookie from 'cookie';
import Home from './containers/Home';
// import Details from './containers/Details'
import TeacherLogin from './containers/TeacherLogin';
import Class from './containers/Class';
import NewClass from './containers/NewClass';
import StudentLogin from './containers/StudentLogin';
import StudentHome from './containers/StudentHome';
import StudentGrades from './containers/StudentGrades';
import Students from './containers/Students';
import DetailsStudent from './components/DetailsStudent';
import AddStudent from './containers/AddStudent';
import RegisterStudent from './components/RegisterStudent';
import RegisterTeacher from './components/RegisterTeacher';
import Assignments from './containers/Assignments';
import AddAssignment from './containers/AddAssignment';
import AssignmentDetails from './containers/AssignmentDetails';
import UpdateAssignment from './components/UpdateAssignment';
import Grades from './containers/Grades';
import GradeDetails from './containers/GradeDetails';
import UpdateGrade from './components/UpdateGrade';
import UpdateClass from './components/UpdateClass';

const checkAuth = () => {
  let cookieObj = cookie.parse(document.cookie);
  let cookieBool = cookieObj.loggedIn;

  if(cookieBool === "true"){
      return true;
  } else {
      return false;
  }

}

// Write ProtectedRoute function here
const ProtectedRoute = (props) => {
  const {component: Component, ...rest} = props;
  
      return(
          checkAuth() === true ?
            <Component {...rest} /> 
          :
          <Navigate to="/login" />
      ) 
  
}

const Router = () => (
  <Routes>
  
    <Route exact path="/login" element={<TeacherLogin />} />{/* example of a container with redux*/}
    <Route path="teacher-registration" element={<RegisterTeacher/>}/>
    <Route path="/" element={<ProtectedRoute component={Home} />} />
    <Route path='/class/:id' element={<ProtectedRoute component={Class}/>} />
    <Route path="/new-class" element={<ProtectedRoute component={NewClass}/>}/>
    <Route path="/update-class/:id" element={<ProtectedRoute component={UpdateClass}/>}/>
    <Route path="/assignments/:id" element={<ProtectedRoute component={Assignments}/>}/>
    <Route path="/assignment/:id" element={<ProtectedRoute component={AssignmentDetails}/>}/>
    <Route path="/add-assignment/:id" element={<ProtectedRoute component={AddAssignment}/>}/>
    <Route path="/update-assignment/:id" element={<ProtectedRoute component={UpdateAssignment}/>}/>
    <Route path="/grades/:id" element={<ProtectedRoute component={Grades}/>}/>
    <Route path="/grade/:id" element={<ProtectedRoute component={GradeDetails}/>}/>
    <Route path="/update-grade/:id" element={<ProtectedRoute component={UpdateGrade}/>}/>
    <Route path="/details-student/:id" element={<ProtectedRoute component={DetailsStudent}/>}/>
    <Route path="/student-login" element={<StudentLogin />} />
    <Route path="/student-registration" element={<RegisterStudent/>}/>
    <Route path="/student-home" element={<ProtectedRoute component={StudentHome}/>}/>
    <Route path="/student-grades/:id" element={<ProtectedRoute component={StudentGrades}/>}/>
    <Route path="/students" element={<ProtectedRoute component={Students}/>}/>
    <Route path="/add-student/:id" element={<ProtectedRoute component={AddStudent}/>}/>
  </Routes>
)

export default Router