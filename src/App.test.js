import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import App from './App';

describe('App', ()=> {
  const initialState = {
    gridBlueprint:[],
    gridData :[],
    selectedInput:0}
  const mockStore = configureStore()
  let store;
  store = mockStore(initialState);
 
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}> <App /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});

