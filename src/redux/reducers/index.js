import { combineReducers } from 'redux';
import inventory from './inventory';
import newItem from './newItem';

export default combineReducers({
  inventory,
  newItem
})
