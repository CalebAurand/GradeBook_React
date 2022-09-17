import { connect } from 'react-redux';
import Students from '../components/Students';

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Students)