export const GET_GLGAMELISTGEAR = "GET_GLGAMELISTGEAR";
const SET_GLGAMELISTGEAR= "SET_GLGAMELISTGEAR";

export const getGLGameListGear = () => ({
  type: GET_GLGAMELISTGEAR
});

export const setGLGameListGear= (gl_gamelist_gear) => ({
  type: SET_GLGAMELISTGEAR,
  gl_gamelist_gear: gl_gamelist_gear
});

const initialState = {
  gl_gamelist_gear: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLGAMELISTGEAR:
      const { gl_gamelist_gear } = action;
      return { ...state, gl_gamelist_gear: gl_gamelist_gear };
    default:
      return state;
  }
};
