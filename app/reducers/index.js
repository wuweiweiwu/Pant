// @flow
import { combineReducers } from 'redux';
import menu from './menu';
import color from './color';

const rootReducer = combineReducers({
  menu,
  color
});

export default rootReducer;
