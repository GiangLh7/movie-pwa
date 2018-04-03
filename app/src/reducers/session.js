import sessionActionTypes from '../actiontypes/session';

export default (state={ id: null, name: null, clients: [], previousSessions: []}, action) => {
  switch (action.type) {
    case sessionActionTypes.CREATE_SESSION_SUCCESS:
    case sessionActionTypes.JOIN_SESSION:
      return {
        ...state,
        id: action.payload.sessionId
      };
    case sessionActionTypes.RECEIVE_CLIENT_LIST:
      return {
        ...state,
        clients: action.payload
      }
    case sessionActionTypes.LEAVE_SESSION:
      return {
        ...state,
        id: null,
        name: null,
        client: []
      };
    case sessionActionTypes.RENAME_SESSION:
    case sessionActionTypes.RECEIVE_SESSION_NAME:
      return {
        ...state,
        name: action.payload
      };
    case sessionActionTypes.LOAD_PREVIOUS_SESSIONS:
      return {
        ...state,
        previousSessions: action.payload
      }
    default:
      return state;
  }
};