export const GET_GLPASSIVEABILITYNEW = "GET_GLPASSIVEABILITYNEW";
const SET_GLPASSIVEABILITYNEW = "SET_GLPASSIVEABILITYNEW";

export const getGLPassiveAbilityNew = () => ({
  type: GET_GLPASSIVEABILITYNEW
});

export const setGLPassiveAbilityNew = (passive_ability_new_gl) => ({
  type: SET_GLPASSIVEABILITYNEW,
  passive_ability_new_gl: passive_ability_new_gl
});

const initialState = {
  passive_ability_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLPASSIVEABILITYNEW:
      const { passive_ability_new_gl } = action;
      return { ...state, passive_ability_new_gl: passive_ability_new_gl };
    default:
      return state;
  }
};
