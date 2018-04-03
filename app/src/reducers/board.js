import boardActionTypes from '../actiontypes/board';

export default (state=null, action) => {
  switch (action.type) {
    case boardActionTypes.ADD_BOARD:
      return {
        name: action.payload
      };
    default:
      return state;
  }
}