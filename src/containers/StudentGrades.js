import { connect } from 'react-redux'
import StudentGrades from '../components/StudentGrades'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    classes: state.classes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //add a way to add accomodations requests here
    //add a way to add emergency info here
    //add a way to add birthday info here....maybe, or set by teacher
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentGrades)