import { connect } from 'react-redux'
import StudentLogin from '../components/StudentLogin'
import {setUser, fetchStudentLogin} from '../redux/actions'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user)=>dispatch(setUser(user)),
    fetchLogin: (user)=> dispatch(fetchStudentLogin(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentLogin)