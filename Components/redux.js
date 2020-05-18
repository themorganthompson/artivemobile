import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions(
  {
    request: ["fetching", "error", "user"],
    success: ["fetching", "error", "user"],
    failure: ["fetching", "error", "user"],
  },
  {}
);

export { Creators };

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
  state.setState({ fetching: true, user: action });
};

export const success = (state, action) => {
  console.log(action);
  return state.setState({ fetching: false, error: null, user: action });
};

export const failure = (state, action) => {
  state.setState({ fetching: false, error: true, user: null });
};

export default createReducer(INITIAL_STATE, HANDLERS);
