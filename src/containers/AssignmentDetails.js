import { connect } from 'react-redux';
import AssignmentDetails from '../components/AssignmentDetails';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    classes: state.classes
  }
}

export default connect(mapStateToProps)(AssignmentDetails)