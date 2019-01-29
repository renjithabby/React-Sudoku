import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Footer from './Footer';

configure({adapter : new Adapter()});

describe.only('<Footer />', () => {
    
    it('It matches the snapshot', () => {
        const tree = shallow(<Footer setSelectedInputValue={()=>{}}/>);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('It matches the snapshot with props selectedInput value', () => {
        const tree = shallow(<Footer selectedInput={5} setSelectedInputValue={()=>{}}/>);
        expect(toJson(tree)).toMatchSnapshot();
    });

})