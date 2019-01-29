import React from 'react';
import PropTypes from 'prop-types';

import './style.css';


const Cell =  ({id, invalid, value, prefilled, handleCellClick }) => {
    return (<div onClick={handleCellClick}  id={id} className= {`cell-container cell-container--${invalid?'invalid':'valid'} ${prefilled?'cell-container--prefilled':''}`}>
        <span className="cell-value">{value?value:''}</span> 
    </div>)
};

export default Cell;

Cell.propTypes= {
    id : PropTypes.number.isRequired,
    invalid : PropTypes.bool,
    value   : PropTypes.number,
    prefilled : PropTypes.bool
}

Cell.defaultProps= {
    invalid : false,
    value   : 0,
    prefilled : false
}
