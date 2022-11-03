export const GET_GLGAMELISTAILMENT = "GET_GLGAMELISTAILMENT";
const SET_GLGAMELISTAILMENT= "SET_GLGAMELISTAILMENT";

export const getGLGameListAilment = () => ({
  type: GET_GLGAMELISTAILMENT
});

export const setGLGameListAilment= (gl_gamelist_ailment) => ({
  type: SET_GLGAMELISTAILMENT,
  gl_gamelist_ailment: gl_gamelist_ailment
});

const initialState = {
  gl_gamelist_ailment: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLGAMELISTAILMENT:
      const { gl_gamelist_ailment } = action;
      return { ...state, gl_gamelist_ailment: gl_gamelist_ailment };
    default:
      return state;
  }
};
