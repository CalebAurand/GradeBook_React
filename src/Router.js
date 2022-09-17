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
    <Route path="/" element={<ProtectedRoute component={Home} />} />
    <Route path='/class/:id' element={<ProtectedRoute component={Class}/>} />
    <Route path="/new-class" element={<ProtectedRoute component={NewClass}/>}/>
    <Route path="/student-login" element={<StudentLogin />} />
    <Route path="/student-home" element={<ProtectedRoute component={StudentHome}/>}/>
    <Route path="/student-grades/:id" element={<ProtectedRoute component={StudentGrades}/>}/>
    <Route path="/students" element={<ProtectedRoute component={Students}/>}/>
    
  </Routes>
)

export default Router