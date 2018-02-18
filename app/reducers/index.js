// @flow
import { combineReducers } from 'redux';
import menu from './menu';
import color from './color';
import canvas from './canvas';

const rootReducer = combineReducers({
  menu,
  color,
  canvas
});

export default rootReducer;
