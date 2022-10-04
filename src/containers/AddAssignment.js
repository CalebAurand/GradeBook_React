import { connect } from 'react-redux';
import AddAssignment from '../components/AddAssignment';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    classes: state.classes
  }
}

export default connect(mapStateToProps)(AddAssignment)