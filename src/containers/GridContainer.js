import { connect } from 'react-redux';
import Grid from '../components/grid/Grid';
import {generateGridData,assignValueToSelectedCell} from '../actions/gameActions';

const mapStateToProps = state => {
  return {
    gridData: state.gridData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    assignValueToSelectedCell: id => {
      dispatch(assignValueToSelectedCell(id))
    },
    generateGridData: () => dispatch(generateGridData())
  }
}

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)

export default GridContainer;