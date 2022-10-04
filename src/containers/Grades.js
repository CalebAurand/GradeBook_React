import { connect } from 'react-redux';
import Grades from '../components/Grades';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    classes: state.classes
  }
}

export default connect(mapStateToProps)(Grades)