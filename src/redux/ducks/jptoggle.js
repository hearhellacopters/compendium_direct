export const GET_JPTOGGLE = "GET_JPTOGGLE";
export const SET_JPTOGGLE = "SET_JPTOGGLE";
export const SET_FALSE = "SET_FALSE";
export const SET_TRUE = "SET_JTRUE";

if(window.localStorage.getItem("ver") == null){
  window.localStorage.setItem('ver', "GL")
}

const set_toggle = (toggle)=>{
  if(toggle){
    window.localStorage.setItem('ver', "JP")
  } else {
    window.localStorage.setItem('ver', "GL")
  }
  return toggle
}

const set_false = (toggle)=>{
  window.localStorage.setItem('ver', "GL")
  return toggle
}

const set_true = (toggle)=>{
  window.localStorage.setItem('ver', "JP")
  return toggle
}

export const getJPToggle = () => ({
  type: GET_JPTOGGLE,
});

export const setJPToggle = (toggle) => ({
  type: SET_JPTOGGLE,
  toggle: set_toggle(toggle)
});

export const setFalse = (toggle) => ({
  type: SET_FALSE,
  toggle: set_false(toggle)
});

export const setTrue = (toggle) => ({
  type: SET_TRUE,
  toggle: set_true(toggle)
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
