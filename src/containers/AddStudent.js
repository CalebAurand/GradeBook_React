import { connect } from 'react-redux';
import AddStudent from '../components/AddStudent';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    classes: state.classes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //any actions New Class will need
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent)