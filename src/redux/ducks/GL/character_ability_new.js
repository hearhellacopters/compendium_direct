export const GET_GLCHARACTERABILITYNEW = "GET_GLCHARACTERABILITYNEW";
const SET_GLECHARACTERABILITYNEW = "SET_GLECHARACTERABILITYNEW";

export const getGLCharacterAbilityNew = () => ({
  type: GET_GLCHARACTERABILITYNEW
});

export const setGLCharacterAbilityNew = (character_ability_new_gl) => ({
  type: SET_GLECHARACTERABILITYNEW,
  character_ability_new_gl: character_ability_new_gl
});

const initialState = {
  character_ability_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLECHARACTERABILITYNEW:
      const { character_ability_new_gl } = action;
      return { ...state, character_ability_new_gl: character_ability_new_gl };
    default:
      return state;
  }
};
