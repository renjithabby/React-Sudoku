import {
    GENERATE_GRID_DATA_FROM_GRID_BLUEPRINT,
    SET_SELECTED_INPUT_VALUE,
    ASSIGN_VALUE_TO_SELECTED_CELL }from '../actions/actionConstants';
const MAX_ROW_VALUE = 9;
/**
    [1,2,3,4,5,6,7,8,9],
    [4,5,6,7,8,9,1,2,3],
    [7,8,9,1,2,3,4,5,6],
    [2,3,4,5,6,7,8,9,1],
    [5,6,7,8,9,1,2,3,4],
    [8,9,1,2,3,4,5,6,7],
    [3,4,5,6,7,8,9,1,2],
    [6,7,8,9,1,2,3,4,5],
    [9,1,2,3,4,5,6,7,8]]
    Below gridBlueprint is created from the above result.
 **/
const initialState ={
    gridBlueprint:[
        [8,3,0,1,0,0,6,0,5],
        [0,0,0,0,0,0,0,8,0],
        [0,0,0,7,0,0,9,0,0],
        [0,5,0,0,1,7,0,0,0],
        [0,0,3,0,0,0,2,0,0],
        [0,0,0,3,4,0,0,1,0],
        [0,0,4,0,0,8,0,0,0],
        [0,9,0,0,0,0,0,0,0],
        [3,0,2,0,0,6,0,4,7]],
    gridData :[],
    selectedInput:0,
};

/**
 * Helper Function
 * Genrate a Grid Data from the given blueprint
 * @param {*} gridBlueprint 
 */
export const generateGridData= (gridBlueprint) =>{
    let gridData = [];
    gridBlueprint.forEach((gridRow,rowIndex) =>{
        gridData=[...gridData,gridRow.map((element,columnIndex)=>{
            return {
                id: (rowIndex * MAX_ROW_VALUE) + columnIndex,
                value:element,
                invalid:false,
                prefilled:element?true:false
            }})
        ]  
    });
    return gridData;
};

/**
 * Helper Function
 * Function to update the value of a given cell with a give ID
 * @param {*} gridData 
 * @param {*} cellRow 
 * @param {*} ID 
 * @param {*} newValue 
 */
export const updateCellValue = (gridData,cellRow,ID, newValue) =>{
    const newRow = gridData[cellRow].map((element)=>element.id === ID?{...element,value:newValue}:element);
    return  gridData.map((rowElement, rowIndex) => rowIndex===cellRow?newRow:rowElement);
};


/**
 * Helper Function
 * Composite Fucntion to update the cell with new value and re-evaluate the grid with the latest update.
 * @param {*} gridData 
 * @param {*} ID 
 * @param {*} newValue 
 * returns newGridData
 */
const evaluateAndUpdateGridData = (gridData, ID, newValue) =>{
    if (!newValue)
        return gridData;
    const cellRow = Math.floor(ID/MAX_ROW_VALUE);
    const MAX_BOX_ROW =3;
    let newGridData = gridData;

    newGridData = updateCellValue(newGridData,cellRow,ID,newValue);
    for(let row=0; row<MAX_ROW_VALUE;row++){
        for(let col=0; col<MAX_ROW_VALUE;col++){
            newGridData = updateDuplicateRowsEntries(newGridData,row*MAX_ROW_VALUE+col);
        }
    }
    for(let row=0; row<MAX_ROW_VALUE;row++){
        for(let col=0; col<MAX_ROW_VALUE;col++){
            newGridData = updateDuplicateColumnEntry(newGridData,col*MAX_ROW_VALUE+row);
        }
    }
    for(let row=0; row<MAX_BOX_ROW;row++){
        for(let col=0; col<MAX_BOX_ROW;col++){
            newGridData = updateDuplicateBoxEntry(newGridData,col*MAX_BOX_ROW+row*MAX_ROW_VALUE*3);
        }
    }
       
    return newGridData;
};

/**
 * Helper Function
 * Functon for setting and resetting the 'invalid' property of all duplicate row entries
 * @param {*} gridData 
 * @param {*} ID 
 * returns gridData
 */
export const updateDuplicateRowsEntries = (gridData,ID) => {
    const cellRow = Math.floor(ID/MAX_ROW_VALUE);
    let newRow= [];
    const cell =  gridData[cellRow].find(element => element.id === ID);
    if(!cell.value)
        return gridData;
    const duplicateRowCellsCount = getDuplicateRowCellsCount(gridData[cellRow],cell.value);
    if(duplicateRowCellsCount>1){
        newRow = gridData[cellRow].map((element)=>element.value === cell.value ?{...element,invalid:true}:element);
    }else if(duplicateRowCellsCount===1){
        newRow = gridData[cellRow].map((element)=>element.value === cell.value ?{...element,invalid:false}:element);
    }
    return Object.assign([...gridData],{[cellRow]:newRow});
};
/**
 * Helper Function
 * Function to check whether there is any duplicate cells with a given value
 * @param {*} dataRow 
 * @param {*} value 
 * returns number of cells with a given value
 */
export const getDuplicateRowCellsCount = (dataRow, value)=>{
    const duplicateRowCells =  dataRow.filter((element)=>(element.value === value));
    return duplicateRowCells.length;
};

/**
 * Helper Function
 * Functon for setting and resetting the 'invalid' property of all duplicate column entries
 * @param {*} gridData 
 * @param {*} ID 
 * returns new gridData
 */
export const updateDuplicateColumnEntry = (gridData,ID) => {
    const cellRow = Math.floor(ID/MAX_ROW_VALUE);
    const cellColumn = ID%MAX_ROW_VALUE;
    let newColumn=[], newRow = [], newGrid= gridData;
    const cell =  gridData[cellRow].find(element => element.id === ID);
    if(!cell.value)
        return gridData;
    let duplicateColumnsCount = 0;
    for(var row=0; row<9; row++){
        if(gridData[row][cellColumn].value === cell.value)
        duplicateColumnsCount++;
    }
    for( row =0;row<9;row++){
        newColumn = {...newGrid[row][cellColumn]};
        if(newGrid[row][cellColumn].value === cell.value && duplicateColumnsCount>1)
            newColumn = {...newGrid[row][cellColumn],invalid:true};
        if(newGrid[row][cellColumn].value === cell.value && duplicateColumnsCount===1 && getDuplicateRowCellsCount(newGrid[row],cell.value)<=1)
            newColumn = {...newGrid[row][cellColumn],invalid:false};    
        newRow = Object.assign([...newGrid[row]],{[cellColumn]:newColumn});
        newGrid=  Object.assign([...newGrid],{[row]:newRow});
    }

    return newGrid;
};
/**
 * Helper Function
 * Function to get the starting row and column index from a given cell ID
 * @param {*} ID 
 */
export const getBoxStartingIndexes = (ID) =>{
    const MAX_ROW_VALUE = 9;
    const MAX_BOX_ROW = 3;
    const boxStartingRow = Math.floor(ID/(MAX_ROW_VALUE*MAX_BOX_ROW))*MAX_BOX_ROW;
    const boxStartingColumn = Math.floor((ID%MAX_ROW_VALUE)/MAX_BOX_ROW)*MAX_BOX_ROW; 
    return {boxStartingRow,boxStartingColumn};
}
/**
 * Helper Function
 * Function to get the array of cells in a sudoku box with given start row and column index
 * @param {*} gridData 
 * @param {*} boxStartingRow 
 * @param {*} boxStartingColumn 
 */
export const getBoxItems = (gridData,boxStartingRow, boxStartingColumn) => {
    let boxItems =[];
    for(let row=boxStartingRow; row<boxStartingRow+3; row++){
        for(let col=boxStartingColumn; col<boxStartingColumn+3; col++){
            boxItems = [...boxItems, gridData[row][col]];
        }
    }
    return boxItems;
};
/**
 * Helper Function
 * Functon for setting and resetting the 'invalid' property of all duplicate box cell entries
 * @param {*} gridData 
 * @param {*} ID 
 * returns new gridData
 */
export const updateDuplicateBoxEntry = (gridData, ID) =>{
    const MAX_BOX_ROW = 3;
    const {boxStartingRow,boxStartingColumn} = getBoxStartingIndexes(ID);
    const cloneGridData = JSON.parse(JSON.stringify(gridData));
    const boxItems = getBoxItems(cloneGridData,boxStartingRow,boxStartingColumn);

    boxItems.forEach(item => {
        if(!item.value){
            return
        }
        let duplicates = boxItems.find(boxItem =>{
            return (boxItem.value ===item.value && boxItem.id !==item.id)
        });
        for(let row=boxStartingRow; row<boxStartingRow+MAX_BOX_ROW; row++){
            for(let col=boxStartingColumn; col<boxStartingColumn+MAX_BOX_ROW; col++){
                if(cloneGridData[row][col].value===item.value && duplicates){
                    cloneGridData[row][col].invalid = true;
                }
            }
        }
        
    });
    return cloneGridData;
}


export const game =(state = initialState, action)=>{
        let gridData;
    switch(action.type){
        case GENERATE_GRID_DATA_FROM_GRID_BLUEPRINT:
            gridData = generateGridData(state.gridBlueprint);
            return {...state, gridData};
        case SET_SELECTED_INPUT_VALUE:
            const selectedInput = action.value;
            return {...state, selectedInput};
        case ASSIGN_VALUE_TO_SELECTED_CELL:
            gridData = evaluateAndUpdateGridData(state.gridData,action.id,state.selectedInput);
            return {...state,gridData};
        default:
            return state;
    }   
};

