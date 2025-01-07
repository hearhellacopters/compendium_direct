export const GET_JPCOMMANDABILITYCOMPARE = "GET_JPCOMMANDABILITYCOMPARE";
const SET_JPCOMMANDABILITYCOMPARE = "SET_JPCOMMANDABILITYCOMPARE";

export const getJPCommandAbilityCompare = () => ({
  type: GET_JPCOMMANDABILITYCOMPARE
});

export const setJPCommandAbilityCompare = (command_ability_compare_jp) => ({
  type: SET_JPCOMMANDABILITYCOMPARE,
  command_ability_compare_jp: command_ability_compare_jp
});

const initialState = {
  command_ability_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPCOMMANDABILITYCOMPARE:
      const { command_ability_compare_jp } = action;
      return { ...state, command_ability_compare_jp: command_ability_compare_jp };
    default:
      return state;
  }
};
