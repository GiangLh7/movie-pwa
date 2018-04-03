import {combineReducers} from 'redux';
import posts from './posts';
import session from './session';
import user from './user';
import board from './board';

const rootReducer = combineReducers({
  posts,
  session,
  user,
  board
});

export default rootReducer;