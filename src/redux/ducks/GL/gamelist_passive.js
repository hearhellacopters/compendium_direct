export const GET_GLGAMELISTPASSIVE = "GET_GLGAMELISTPASSIVE";
const SET_GLGAMELISTPASSIVE = "SET_GLGAMELISTPASSIVE";

export const getGLGameListPassive = () => ({
  type: GET_GLGAMELISTPASSIVE
});

export const setGLGameListPassive = (gl_gamelist_passive) => ({
  type: SET_GLGAMELISTPASSIVE,
  gl_gamelist_passive: gl_gamelist_passive
});

const initialState = {
  gl_gamelist_passive: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLGAMELISTPASSIVE:
      const { gl_gamelist_passive } = action;
      return { ...state, gl_gamelist_passive: gl_gamelist_passive };
    default:
      return state;
  }
};
