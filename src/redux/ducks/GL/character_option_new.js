export const GET_GLCHARACTEROPTIONNEW = "GET_GLCHARACTEROPTIONNEW";
const SET_GLCHARACTEROPTIONNEW = "SET_GLCHARACTEROPTIONNEW";

export const getGLCharacterOptionNew = () => ({
  type: GET_GLCHARACTEROPTIONNEW
});

export const setGLCharacterOptionNew = (character_option_new_gl) => ({
  type: SET_GLCHARACTEROPTIONNEW,
  character_option_new_gl: character_option_new_gl
});

const initialState = {
  character_option_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLCHARACTEROPTIONNEW:
      const { character_option_new_gl } = action;
      return { ...state, character_option_new_gl: character_option_new_gl };
    default:
      return state;
  }
};
