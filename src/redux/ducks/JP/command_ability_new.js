export const GET_JPCOMMANDABILITYNEW = "GET_JPCOMMANDABILITYNEW";
const SET_JPCOMMANDABILITYNEW = "SET_JPCOMMANDABILITYNEW";

export const getJPCommandAbilityNew = () => ({
  type: GET_JPCOMMANDABILITYNEW
});

export const setJPCommandAbilityNew = (command_ability_new_jp) => ({
  type: SET_JPCOMMANDABILITYNEW,
  command_ability_new_jp: command_ability_new_jp
});

const initialState = {
  command_ability_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPCOMMANDABILITYNEW:
      const { command_ability_new_jp } = action;
      return { ...state, command_ability_new_jp: command_ability_new_jp };
    default:
      return state;
  }
};
