import { connect } from 'react-redux';
import CreateStudent from '../components/CreateStudent';

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //any actions New Class will need
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)