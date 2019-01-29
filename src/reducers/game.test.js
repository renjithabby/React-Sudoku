import {getDuplicateRowCellsCount, updateCellValue, updateDuplicateRowsEntries, updateDuplicateColumnEntry, generateGridData} from './game';

describe('game Reducer', () =>{

    describe('generateGridData', ()=>{
        it('should sucessfully generate the a gridData from te give blue print', () =>{
            const bluePrint = [[0,1],[2,0]];
            const expectedResult = [[
                {
                    id: 0,
                    value:0,
                    invalid:false,
                    prefilled:false
                },
                {
                    id: 1,
                    value:1,
                    invalid:false,
                    prefilled:true
                },
            ],
            [
                {
                    id: 9,
                    value:2,
                    invalid:false,
                    prefilled:true
                },
                {
                    id: 10,
                    value:0,
                    invalid:false,
                    prefilled:false
                },
            ]];
            const gridData = generateGridData(bluePrint);

            expect(gridData).toStrictEqual(expectedResult);
        })

    });
    
    describe('getDuplicateRowCellsCount', ()=>{

        it('Should return the correct  total count of matching entries', () =>{
            const gridData =[[
                {
                    id: 0,
                    value:2,
                    invalid:false,
                    prefilled:true
                },
                {
                    id: 1,
                    value:2,
                    invalid:false,
                    prefilled:true
                }
            ]];
            const cellValue = 2;
        
            expect(getDuplicateRowCellsCount(gridData[0],cellValue)).toEqual(2);
        });

        it('Should return 0 if there is no matching entry', () =>{
            const gridData =[[
                {
                    id: 0,
                    value:1,
                    invalid:false,
                    prefilled:true
                },
                {
                    id: 1,
                    value:3,
                    invalid:false,
                    prefilled:true
                }
            ]];
            const cellValue = 2;
        
            expect(getDuplicateRowCellsCount(gridData[0],cellValue)).toEqual(0);
        })
    });

    describe('updateCellValue', ()=>{

        it('Should successfully update the cell value for the given ID without mutating', () =>{
            const gridData =[[
                {
                    id: 0,
                    value:1,
                    invalid:false,
                    prefilled:true
                },
                {
                    id: 1,
                    value:2,
                    invalid:false,
                    prefilled:true
                }
            ]];
            const cloneGridData = JSON.parse(JSON.stringify(gridData))
            const newValue = 3;
            const expectedResult = [[
                {
                    id: 0,
                    value:1,
                    invalid:false,
                    prefilled:true
                },
                {
                    id: 1,
                    value:3,
                    invalid:false,
                    prefilled:true
                }
            ]];
        
            expect(updateCellValue(gridData,0,1,newValue,true)).toStrictEqual(expectedResult);
            expect(gridData).toStrictEqual(cloneGridData);
        });

    })

    describe('updateDuplicateRowsEntries', ()=>{

        it('Should set invalid property "true", if there are multiple row values, mathcing the given cell ', () =>{
            const gridData =[[
                {
                    id: 0,
                    value:2,
                    invalid:false,
                    prefilled:true
                },
                {
                    id: 1,
                    value:2,
                    invalid:false,
                    prefilled:true
                },
                {
                    id: 3,
                    value:4,
                    invalid:false,
                    prefilled:true
                }
            ]];
            const cloneGridData = JSON.parse(JSON.stringify(gridData));
            const expectedGridDataResult=[[
                {
                    id: 0,
                    value:2,
                    invalid:true,
                    prefilled:true
                },
                {
                    id: 1,
                    value:2,
                    invalid:true,
                    prefilled:true
                },
                {
                    id: 3,
                    value:4,
                    invalid:false,
                    prefilled:true
                }
            ]];
            const cellID = 1;

            const updatedGridData = updateDuplicateRowsEntries(gridData,cellID);
            expect(updatedGridData).toStrictEqual(expectedGridDataResult);
            expect(gridData).toStrictEqual(cloneGridData);
        });

        it('Should set invalid property "false", if there is only one row value, matching the given cell ', () =>{
            const gridData =[[
                {
                    id: 0,
                    value:1,
                    invalid:false,
                    prefilled:true
                },
                {
                    id: 1,
                    value:2,
                    invalid:true,
                    prefilled:true
                },
                {
                    id: 3,
                    value:4,
                    invalid:true,
                    prefilled:true
                }
            ]];
            const cloneGridData = JSON.parse(JSON.stringify(gridData));
            const expectedGridDataResult=[[
                {
                    id: 0,
                    value:1,
                    invalid:false,
                    prefilled:true
                },
                {
                    id: 1,
                    value:2,
                    invalid:false,
                    prefilled:true
                },
                {
                    id: 3,
                    value:4,
                    invalid:true,
                    prefilled:true
                }
            ]];
            const cellID = 1;

            const updatedGridData = updateDuplicateRowsEntries(gridData,cellID);
            expect(updatedGridData).toStrictEqual(expectedGridDataResult);
            expect(gridData).toStrictEqual(cloneGridData);
        })
    });

    describe ('updateDuplicateColumnEntry', () =>{
        it('Should set "invalid" property "true", if there are multiple column values, matching the given cell', () =>{
            const gridData =[
                [
                {
                    id: 0,
                    value:1,
                    invalid:false,
                    prefilled:true
                }
            ], [
                {
                    id: 9,
                    value:1,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 18,
                    value:1,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 27,
                    value:1,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 36,
                    value:1,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 45,
                    value:1,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 54,
                    value:1,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 63,
                    value:1,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 72,
                    value:1,
                    invalid:false,
                    prefilled:true
                }
            ]];
            const cloneGridData = JSON.parse(JSON.stringify(gridData));
            const expectedResult = [
                [
                {
                    id: 0,
                    value:1,
                    invalid:true,
                    prefilled:true
                }
            ], [
                {
                    id: 9,
                    value:1,
                    invalid:true,
                    prefilled:true
                }
            ],[
                {
                    id: 18,
                    value:1,
                    invalid:true,
                    prefilled:true
                }
            ],[
                {
                    id: 27,
                    value:1,
                    invalid:true,
                    prefilled:true
                }
            ],[
                {
                    id: 36,
                    value:1,
                    invalid:true,
                    prefilled:true
                }
            ],[
                {
                    id: 45,
                    value:1,
                    invalid:true,
                    prefilled:true
                }
            ],[
                {
                    id: 54,
                    value:1,
                    invalid:true,
                    prefilled:true
                }
            ],[
                {
                    id: 63,
                    value:1,
                    invalid:true,
                    prefilled:true
                }
            ],[
                {
                    id: 72,
                    value:1,
                    invalid:true,
                    prefilled:true
                }
            ]];
            const cellID = 0;
            const updatedGridData = updateDuplicateColumnEntry(gridData,cellID);
            expect(updatedGridData).toStrictEqual(expectedResult);
            expect(gridData).toStrictEqual(cloneGridData);
        });
        it('Should set "invalid" property "false", if there is only one column values and no duplicate row values, matching the given cell', () =>{
            const gridData =[
                [
                {
                    id: 0,
                    value:1,
                    invalid:true,
                    prefilled:true
                }
            ], [
                {
                    id: 9,
                    value:2,
                    invalid:true,
                    prefilled:true
                }
            ],[
                {
                    id: 18,
                    value:3,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 27,
                    value:4,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 36,
                    value:5,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 45,
                    value:6,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 54,
                    value:7,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 63,
                    value:8,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 72,
                    value:9,
                    invalid:false,
                    prefilled:true
                }
            ]];
            const cloneGridData = JSON.parse(JSON.stringify(gridData));
            const expectedResult = [
                [
                {
                    id: 0,
                    value:1,
                    invalid:false,
                    prefilled:true
                }
            ], [
                {
                    id: 9,
                    value:2,
                    invalid:true,
                    prefilled:true
                }
            ],[
                {
                    id: 18,
                    value:3,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 27,
                    value:4,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 36,
                    value:5,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 45,
                    value:6,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 54,
                    value:7,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 63,
                    value:8,
                    invalid:false,
                    prefilled:true
                }
            ],[
                {
                    id: 72,
                    value:9,
                    invalid:false,
                    prefilled:true
                }
            ]];
            const cellID = 0;
            const updatedGridData = updateDuplicateColumnEntry(gridData,cellID);
            expect(updatedGridData).toStrictEqual(expectedResult);
            expect(gridData).toStrictEqual(cloneGridData);
        });

    })

});