export const GET_GLCOMMANDABILITYNEW = "GET_GLCOMMANDABILITYNEW";
const SET_GLECOMMANDABILITYNEW = "SET_GLECOMMANDABILITYNEW";

export const getGLCommandAbilityNew = () => ({
  type: GET_GLCOMMANDABILITYNEW
});

export const setGLCommandAbilityNew = (command_ability_new_gl) => ({
  type: SET_GLECOMMANDABILITYNEW,
  command_ability_new_gl: command_ability_new_gl
});

const initialState = {
  command_ability_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLECOMMANDABILITYNEW:
      const { command_ability_new_gl } = action;
      return { ...state, command_ability_new_gl: command_ability_new_gl };
    default:
      return state;
  }
};
