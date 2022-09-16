import { connect } from 'react-redux'
import TeacherLogin from '../components/TeacherLogin'
import {setUser, fetchLogin} from '../redux/actions'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user)=>dispatch(setUser(user)),
    fetchLogin: (user)=> dispatch(fetchLogin(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherLogin)