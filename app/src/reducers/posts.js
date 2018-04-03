import postActionTypes from '../actiontypes/post';
import findIndex from 'lodash/findIndex';

const postReducer = (state={}, action) => {
  switch (action.type) {
    case postActionTypes.LIKE_SUCCESS:
    case postActionTypes.RECEIVE_LIKE:
      const array = action.payload.like? 'likes' : 'dislikes';
      return {
        ...state,
        [array]: state[array].concat(action.payload.user)
      };
    case postActionTypes.EDIT_POST:
    case postActionTypes.RECEIVE_EDIT_POST:
      return {
        ...state,
        content: action.payload.content
      }
    default:
      return state;
  }
}

export default (state=[], action) => {
  switch (action.type) {
    case postActionTypes.JOIN_SESSION:
    case postActionTypes.LEAVE_SESSION:
    case postActionTypes.CREATE_SESSION_SUCCESS:
      return [];
    case postActionTypes.RECEIVE_BOARD:
      return action.payload;
    case postActionTypes.ADD_POST_SUCCESS:
    case postActionTypes.RECEIVE_POST:
      return [
        ...state,
        action.payload
      ];
    case postActionTypes.DELETE_POST:
    case postActionTypes.RECEIVE_DELETE_POST:
      return state.filter(post => post.id !== action.payload.id);
    case postActionTypes.EDIT_POST:
    case postActionTypes.RECEIVE_EDIT_POST:
      const index = findIndex(state, p => p.id === action.payload.id);
      return index > -1 ? [
        ...state.slice(0, index),
        postReducer(state[index], action),
        ...state.slice(index + 1)
      ] : state;
    default:
      return state;
  }
}