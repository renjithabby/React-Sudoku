import {
    GENERATE_GRID_DATA_FROM_GRID_BLUEPRINT,
    SET_SELECTED_INPUT_VALUE,
    ASSIGN_VALUE_TO_SELECTED_CELL} from './actionConstants';

export const generateGridData = () =>{
    return {type:GENERATE_GRID_DATA_FROM_GRID_BLUEPRINT}
}

export const setSelectedInputValue = (value) =>{
    return {type:SET_SELECTED_INPUT_VALUE, value}
}

export const assignValueToSelectedCell = (id) =>{
    return {type:ASSIGN_VALUE_TO_SELECTED_CELL, id}
}