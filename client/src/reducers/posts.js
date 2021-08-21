import {
  CREATE_POST,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  LIKE,
  UPDATE,
} from '../actions/actionTypes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
    case FETCH_BY_SEARCH:
      return action.payload;
    case CREATE_POST:
      return [...state, action.payload];
    case UPDATE:
    case LIKE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return state.filter((post) => post._id !== action.payload);
    default:
      return state;
  }
};

export default reducer;
