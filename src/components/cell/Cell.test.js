import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Cell from './Cell';

configure({adapter : new Adapter()});

describe('<Cell />', () => {

    it('It matches the snapshot with default values', () => {
        const tree = shallow(<Cell id={0}/>);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('It matches the snapshot with props "prefilled" & "invalid" set to "true"', () => {
        const tree = shallow(<Cell id ={0} value={6} prefilled={true} invalid={true}/>);
        expect(toJson(tree)).toMatchSnapshot();
    });

})