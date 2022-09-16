import { combineReducers } from 'redux';
import cookie from 'cookie';

const user = (state = null, action) => {
  switch(action.type){
    case "SET_USER":
      return action.payload // this assumes that the user passed into the action.payload is an object
    case "UNSET_USER":
      /*let newState = [...state]; >>>>this was a previous version for multiple users, to remove one by its index
      newState.splice(action.payload, 1); //this will remove the user at that index from state*/
      let newState = {};
      return newState
    case "SET_LOGIN":
      document.cookie = cookie.serialize("loggedIn", "true", {maxAge: 7200});
      let copyState = {email: action.payload[0].email, userJWT: action.payload[1], role: action.payload[2], userBool: true};
      return copyState;
    default:
      return state
  }
}

const listings = (state = [], action) => {
  switch (action.type){
    case "ADD_LISTING":
      return [...state, action.payload]
    case "REMOVE_LISTING":
      console.log('got to listings reducer, remove_listing')
      console.log('action payload is ', action.payload)
      console.log('state', state)
      const newState = [...state];
      newState.splice(action.payload, 1)
      console.log('newState', newState)
      return newState
    default:
      return state
  }
}

const classes = (state = [], action) => {
  switch (action.type){
    case "SET_CLASSES":
      return action.payload
    case "UNSET_CLASSES":
      return []
    default:
      return state
  }
}



export default combineReducers({user, listings, classes})