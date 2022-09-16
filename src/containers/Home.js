import { connect } from 'react-redux'
import Home from '../components/Home'
import {removeListing, setClasses} from '../redux/actions'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    listings: state.listings,
    classes: state.classes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeListing: (index)=>dispatch(removeListing(index)),
    setClasses: (userJWT)=>dispatch(setClasses(userJWT))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)