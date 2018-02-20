// @flow
import { combineReducers } from 'redux';
import menuReducer from './menu';
import colorReducer from './color';
import canvasReducer from './canvas';
import windowReducer from './window';

const rootReducer = combineReducers({
  menu: menuReducer,
  color: colorReducer,
  canvas: canvasReducer,
  window: windowReducer
});

export default rootReducer;
