import { connect } from 'react-redux';
import Assignments from '../components/Assignments';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    classes: state.classes
  }
}

export default connect(mapStateToProps)(Assignments)