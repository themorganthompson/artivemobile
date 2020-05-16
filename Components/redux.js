import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

// const Types = createTypes(`
//   USER_REQUEST
//   USER_FAILURE
//   USER_SUCCESS
//   `);

const {Types, Creators} = createActions(
  {
    request: ['user'],
    success: ['user'],
    failure: ['error'],
    // logout: null,
    // custom: (a, b) => ({ type: 'CUSTOM', total: a + b })
  },
  {},
);

export {Creators};

export const HANDLERS = {
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.REQUEST]: request,
};

export const INITIAL_STATE = Immutable({
  user: null,
  fetching: null,
  error: null,
});

export const request = (state, action) => {
  state.setState({fetching: true, user: action});
};

export const success = (state, action) => {
  return state.setState({fetching: false, error: null, user: action});
};

export const failure = (state, action) => {
  state.setState({fetching: false, error: true, user: null});
};

export default createReducer(INITIAL_STATE, HANDLERS);
