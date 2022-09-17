import { connect } from 'react-redux';
import NewClass from '../components/NewClass';

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

export default connect(mapStateToProps, mapDispatchToProps)(NewClass)