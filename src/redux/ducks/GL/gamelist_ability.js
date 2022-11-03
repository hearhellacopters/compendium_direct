export const GET_GLGAMELISTABILITY = "GET_GLGAMELISTABILITY";
const SET_GLGAMELISTABILITY= "SET_GLGAMELISTABILITY";

export const getGLGameListAbility = () => ({
  type: GET_GLGAMELISTABILITY
});

export const setGLGameListAbility = (gl_gamelist_ability) => ({
  type: SET_GLGAMELISTABILITY,
  gl_gamelist_ability: gl_gamelist_ability
});

const initialState = {
  gl_gamelist_ability: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLGAMELISTABILITY:
      const { gl_gamelist_ability } = action;
      return { ...state, gl_gamelist_ability: gl_gamelist_ability };
    default:
      return state;
  }
};
