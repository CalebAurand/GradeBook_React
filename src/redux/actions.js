export const addListing = (newListing) => {
  return {
    type: "ADD_LISTING",
    payload: newListing
  }
}

export const removeListing = (index) => {
  return{
    type: "REMOVE_LISTING",
    payload: index
  }
}

export const setUser = (newUser) => {
  return {
    type: "SET_USER",
    payload: newUser
  }
}

export const unsetUser = (index) => {
  return {
    type: "UNSET_USER",
    payload: index
  }
}

const fetchLoginAction = (userArray) => { //userArray has two items, user object, and JWTString
  return {
    type: "SET_LOGIN",
    payload: userArray
  }
}

export const fetchLogin = (user) => {  
  return(dispatch) => { //prev http://localhost:9000/teacher-login https://home-gradebook.herokuapp.com/teacher-login
    fetch('https://home-gradebook.herokuapp.com/teacher-login',{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(user),
    })
    .then(res=>res.text())
    .then(response => {
      console.log("fetchLogin response",response);
      if(response === "Bad Request" || response === "Internal Server Error"){
        return;
      };
      dispatch(fetchLoginAction([user, response, 'teacher']))
    })
  }
}

export const fetchStudentLogin = (user) => {  
  return(dispatch) => { //prev http://localhost:9000/teacher-login https://home-gradebook.herokuapp.com/teacher-login
    fetch('https://home-gradebook.herokuapp.com/student-login',{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(user),
    })
    .then(res=>res.text())
    .then(response => {
      console.log("fetchStudentLogin response", response);
      if(response === "Bad Request" || response === "Internal Server Error"){
        return;
      };
      dispatch(fetchLoginAction([user, response, 'student']))
    })
  }
}

export const setClasses = (classArray) => {
  return {
    type: "SET_CLASSES",
    payload: classArray
  }
}

// export const fetchClasses = (userJWT) => {
//   console.log("user in fetch classes");
//   let trimdJWT = userJWT.slice(1, userJWT.length-1);
//   return (dispatch)=>{
//     fetch('http://localhost:9000/view-classes',{
//       method: 'GET',
//       headers: {
//         // "Content-type": "application/json; charset=UTF-8",
//         "Authorization": "Bearer "+trimdJWT
//       }
//     })
//     .then(res=>res.json())
//     .then(response=>{
//       console.log("fetchClasses response", response);
//       dispatch(fetchClassesAction(response))
//     })
//   }
// }

export const unsetClasses = (index) => {
  return {
    type: "UNSET_CLASSES",
    payload: index
  }
}


/**Holly & Mila's Axios get/post syntax for Holly's app
 * 
 * axios.post('http://localhost:9000/login', {
 *  email: credentials.email,
 *  password: credentials.password
 * })
 * .then(response=>{
 *  console.log(response.headers);
 *  document.cookie = `jwt=${response.headers.authorization};max-age=60*1000`;
 *  loggingIn();
 * })
 * .catch(function (error){
 *  console.log(error);
 * })
 * 
 */