export const GET_JPCHARACTEROPTIONCOMPARE = "GET_JPCHARACTEROPTIONCOMPARE";
const SET_JPCHARACTEROPTIONCOMPARE = "SET_JPCHARACTEROPTIONCOMPARE";

export const getJPCharacterOptionCompare = () => ({
  type: GET_JPCHARACTEROPTIONCOMPARE
});

export const setJPCharacterOptionCompare = (character_option_compare_jp) => ({
  type: SET_JPCHARACTEROPTIONCOMPARE,
  character_option_compare_jp: character_option_compare_jp
});

const initialState = {
  character_option_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPCHARACTEROPTIONCOMPARE:
      const { character_option_compare_jp } = action;
      return { ...state, character_option_compare_jp: character_option_compare_jp };
    default:
      return state;
  }
};
