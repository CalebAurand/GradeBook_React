import { connect } from 'react-redux';
import Class from '../components/Class';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    classes: state.classes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //line for adding a student to a class
    //line for removing a student from a class
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Class)
