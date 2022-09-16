import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import {setUser, unsetUser, unsetClasses, fetchLogin} from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unsetUser: ()=>dispatch(unsetUser()),
    unsetClasses: ()=>dispatch(unsetClasses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)