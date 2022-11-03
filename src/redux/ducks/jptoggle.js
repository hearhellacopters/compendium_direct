export const GET_JPTOGGLE = "GET_JPTOGGLE";
export const SET_JPTOGGLE = "SET_JPTOGGLE";
export const SET_FALSE = "SET_FALSE";
export const SET_TRUE = "SET_JTRUE";

export const getJPToggle = () => ({
  type: GET_JPTOGGLE,
});

export const setJPToggle = (toggle) => ({
  type: SET_JPTOGGLE,
  toggle: toggle
});

export const setFalse = (toggle) => ({
  type: SET_FALSE,
  toggle: toggle
});

export const setTrue = (toggle) => ({
  type: SET_TRUE,
  toggle: toggle
});

const initialState = {
  toggle: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JPTOGGLE:
      return { ...state, toggle: state.toggle };
    case SET_JPTOGGLE:
      return { ...state, toggle: !state.toggle };
    case SET_FALSE:
      return { ...state, toggle: false };
    case SET_TRUE:
      return { ...state, toggle: true };
    default:
      return state;
  }
};
