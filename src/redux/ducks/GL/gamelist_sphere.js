export const GET_GLGAMELISTSPHERE = "GET_GLGAMELISTSPHERE";
const SET_GLGAMELISTSPHERE= "SET_GLGAMELISTSPHERE";

export const getGLGameListSphere = () => ({
  type: GET_GLGAMELISTSPHERE
});

export const setGLGameListSphere= (gl_gamelist_sphere) => ({
  type: SET_GLGAMELISTSPHERE,
  gl_gamelist_sphere: gl_gamelist_sphere
});

const initialState = {
  gl_gamelist_sphere: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLGAMELISTSPHERE:
      const { gl_gamelist_sphere } = action;
      return { ...state, gl_gamelist_sphere: gl_gamelist_sphere };
    default:
      return state;
  }
};
