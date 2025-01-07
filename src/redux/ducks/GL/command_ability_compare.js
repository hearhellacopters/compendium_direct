export const GET_GLCOMMANDABILITYCOMPARE = "GET_GLCOMMANDABILITYCOMPARE";
const SET_GLECOMMANDABILITYCOMPARE = "SET_GLECOMMANDABILITYCOMPARE";

export const getGLCommandAbilityCompare = () => ({
  type: GET_GLCOMMANDABILITYCOMPARE
});

export const setGLCommandAbilityCompare = (command_ability_compare_gl) => ({
  type: SET_GLECOMMANDABILITYCOMPARE,
  command_ability_compare_gl: command_ability_compare_gl
});

const initialState = {
  command_ability_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLECOMMANDABILITYCOMPARE:
      const { command_ability_compare_gl } = action;
      return { ...state, command_ability_compare_gl: command_ability_compare_gl };
    default:
      return state;
  }
};
