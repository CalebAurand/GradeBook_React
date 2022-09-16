import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import cookie from 'cookie';
import Home from './containers/Home';
// import Details from './containers/Details'
import TeacherLogin from './containers/TeacherLogin';
import StudentLogin from './containers/StudentLogin';
import StudentHome from './containers/StudentHome';
import StudentGrades from './containers/StudentGrades';

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
    <Route path="/student-login" element={<StudentLogin />} />
    <Route path="/" element={<ProtectedRoute component={Home} />} />
    <Route path="/student-home" element={<ProtectedRoute component={StudentHome}/>}/>
    <Route path="/student-grades/:id" element={<ProtectedRoute component={StudentGrades}/>}/>
    
  </Routes>
)

export default Router