import userActionTypes from '../actiontypes/user';

export default (state=null, action) => {
  switch (action.type) {
    case userActionTypes.ADD_USER:
      return {
        name: action.payload
      };
    default:
      return state;
  }
}