import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions(
  {
    request: ["user"],
    success: ["user"],
    failure: ["user"],
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

export const user = state => {
  return state
}

export const request = (state, action) => {
  state.merge({ fetching: true });
};

export const success = (state, action) => {
  return state.merge({ fetching: false, error: null, user: action });
};

export const failure = (state, action) => {
  state.merge({ fetching: false, error: true, user: null });
};

export default createReducer(INITIAL_STATE, HANDLERS);
