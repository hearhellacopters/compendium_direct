export const GET_GLCHARACTERABILITYCOMPARE = "GET_GLCHARACTERABILITYCOMPARE";
const SET_GLECHARACTERABILITYCOMPARE = "SET_GLECHARACTERABILITYCOMPARE";

export const getGLCharacterAbilityCompare = () => ({
  type: GET_GLCHARACTERABILITYCOMPARE
});

export const setGLCharacterAbilityCompare = (character_ability_compare_gl) => ({
  type: SET_GLECHARACTERABILITYCOMPARE,
  character_ability_compare_gl: character_ability_compare_gl
});

const initialState = {
  character_ability_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLECHARACTERABILITYCOMPARE:
      const { character_ability_compare_gl } = action;
      return { ...state, character_ability_compare_gl: character_ability_compare_gl };
    default:
      return state;
  }
};
