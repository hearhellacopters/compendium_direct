export const GET_GLPASSIVEABILITYCOMPARE = "GET_GLPASSIVEABILITYCOMPARE";
const SET_GLPASSIVEABILITYCOMPARE = "SET_GLPASSIVEABILITYCOMPARE";

export const getGLPassiveAbilityCompare = () => ({
  type: GET_GLPASSIVEABILITYCOMPARE
});

export const setGLPassiveAbilityCompare = (passive_ability_compare_gl) => ({
  type: SET_GLPASSIVEABILITYCOMPARE,
  passive_ability_compare_gl: passive_ability_compare_gl
});

const initialState = {
  passive_ability_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLPASSIVEABILITYCOMPARE:
      const { passive_ability_compare_gl } = action;
      return { ...state, passive_ability_compare_gl: passive_ability_compare_gl };
    default:
      return state;
  }
};
