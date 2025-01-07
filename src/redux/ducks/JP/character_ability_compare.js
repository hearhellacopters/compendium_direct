export const GET_JPCHARACTERABILITYCOMPARE = "GET_JPCHARACTERABILITYCOMPARE";
const SET_JPECHARACTERABILITYCOMPARE = "SET_JPECHARACTERABILITYCOMPARE";

export const getJPCharacterAbilityCompare = () => ({
  type: GET_JPCHARACTERABILITYCOMPARE
});

export const setJPCharacterAbilityCompare = (character_ability_compare_jp) => ({
  type: SET_JPECHARACTERABILITYCOMPARE,
  character_ability_compare_jp: character_ability_compare_jp
});

const initialState = {
  character_ability_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPECHARACTERABILITYCOMPARE:
      const { character_ability_compare_jp } = action;
      return { ...state, character_ability_compare_jp: character_ability_compare_jp };
    default:
      return state;
  }
};
