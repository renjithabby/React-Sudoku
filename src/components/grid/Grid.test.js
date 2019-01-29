import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Grid from './Grid';

configure({adapter : new Adapter()});

describe.only('<Grid />', () => {
    
    const gridData =[[
        {
            id:0,
            value:1,
            invalid: false,
            prefilled:false
        },
        {
            id:1,
            value:2,
            invalid: true,
            prefilled:true
        }

    ]]

    it('It matches the snapshot with props dataGrid value', () => {
        const tree = shallow(<Grid  gridData={gridData} generateGridData={()=>{}} assignValueToSelectedCell={()=>{}} />);
        expect(toJson(tree)).toMatchSnapshot();
    });

})