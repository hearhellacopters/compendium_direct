export const GET_JPCHARACTERABILITYNEW = "GET_JPCHARACTERABILITYNEW";
const SET_JPECHARACTERABILITYNEW = "SET_JPECHARACTERABILITYNEW";

export const getJPCharacterAbilityNew = () => ({
  type: GET_JPCHARACTERABILITYNEW
});

export const setJPCharacterAbilityNew = (character_ability_new_jp) => ({
  type: SET_JPECHARACTERABILITYNEW,
  character_ability_new_jp: character_ability_new_jp
});

const initialState = {
  character_ability_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPECHARACTERABILITYNEW:
      const { character_ability_new_jp } = action;
      return { ...state, character_ability_new_jp: character_ability_new_jp };
    default:
      return state;
  }
};
