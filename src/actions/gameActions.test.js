import {
    GENERATE_GRID_DATA_FROM_GRID_BLUEPRINT,
    SET_SELECTED_INPUT_VALUE,
    ASSIGN_VALUE_TO_SELECTED_CELL} from './actionConstants';
import { generateGridData, setSelectedInputValue,assignValueToSelectedCell } from './gameActions';

describe('gameActions', () => {

    it('generateGridData should return correct action', () =>{
        expect(generateGridData()).toStrictEqual({type:GENERATE_GRID_DATA_FROM_GRID_BLUEPRINT})
    });

    it('setSelectedInputValue should return correct action', () =>{
        expect(setSelectedInputValue(3)).toStrictEqual({type:SET_SELECTED_INPUT_VALUE, value:3});
    });

    it('setSelectedInputValue should return correct action', () =>{
        expect(assignValueToSelectedCell(4)).toStrictEqual({type:ASSIGN_VALUE_TO_SELECTED_CELL, id:4});
    });

});