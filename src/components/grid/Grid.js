import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cell from '../cell/Cell';
import './style.css';


class Grid extends Component {

    handleCellClick = (event)=>{
        this.props.assignValueToSelectedCell(parseInt(event.target.id));
    }

    getGridCells =(gridData)=>{
        let  gridCells =  [];
        gridData.forEach(gridRow => {
            gridCells = [...gridCells, gridRow.map(({id, value,invalid,prefilled}) => <Cell handleCellClick={this.handleCellClick} key={id} id ={id} value={value} invalid ={invalid} prefilled ={prefilled}  />)];
        });
        return gridCells;
    }

    componentDidMount(){
        this.props.generateGridData();
    }

    render(){
        const {gridData} = this.props;
        return (
            <div className="grid-container">
                {
                  [...this.getGridCells(gridData)]
                }
            </div>

        );
    };

}

Grid.propTypes= {
    gridData : PropTypes.array.isRequired,
    generateGridData : PropTypes.func.isRequired,
    assignValueToSelectedCell : PropTypes.func.isRequired,
}

export default Grid;
