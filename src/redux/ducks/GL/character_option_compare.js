export const GET_GLCHARACTEROPTIONCOMPARE = "GET_GLCHARACTEROPTIONCOMPARE";
const SET_GLCHARACTEROPTIONCOMPARE = "SET_GLCHARACTEROPTIONCOMPARE";

export const getGLCharacterOptionCompare = () => ({
  type: GET_GLCHARACTEROPTIONCOMPARE
});

export const setGLCharacterOptionCompare = (character_option_compare_gl) => ({
  type: SET_GLCHARACTEROPTIONCOMPARE,
  character_option_compare_gl: character_option_compare_gl
});

const initialState = {
  character_option_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLCHARACTEROPTIONCOMPARE:
      const { character_option_compare_gl } = action;
      return { ...state, character_option_compare_gl: character_option_compare_gl };
    default:
      return state;
  }
};
