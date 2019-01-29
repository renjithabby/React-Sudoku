import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Footer =  ({validEntries,selectedInput,setSelectedInputValue}) => {
    const onButtonClick = (event)=>{
        setSelectedInputValue(parseInt(event.target.value));
    }
    return (
        <div className = 'footer-container'>
            <span>Please choose an input value first</span>
            <div className = 'footer-buttons'>
                {validEntries.map(value =>{
                    return (<button className={`footer-button ${selectedInput===value?'footer-button--selected':''}`} key={value} onClick={onButtonClick} value={value} > {value}</button>)
                })}
            </div>
        </div>
    );
};

export default Footer;

Footer.propTypes= {
    validEntries : PropTypes.array,
    selectedInput : PropTypes.number,
    setSelectedInputValue : PropTypes.func.isRequired,
}

Footer.defaultProps= {
    validEntries  : [1,2,3,4,5,6,7,8,9]
}