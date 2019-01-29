import { connect } from 'react-redux';
import Footer from '../components/footer/Footer';
import {setSelectedInputValue} from '../actions/gameActions';

const mapStateToProps = state => {
  return {
    selectedInput: state.selectedInput
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedInputValue: (value) => dispatch(setSelectedInputValue(value))
  }
}

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)

export default FooterContainer;