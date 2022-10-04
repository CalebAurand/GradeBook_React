import { connect } from 'react-redux';
import GradeDetails from '../components/GradeDetails';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    classes: state.classes
  }
}

export default connect(mapStateToProps)(GradeDetails)