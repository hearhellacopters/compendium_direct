export const GET_JPAILMENTLEVELCONTCOMPARE = "GET_JPAILMENTLEVELCONTCOMPARE";
const SET_JPAILMENTLEVELCONTCOMPARE = "SET_JPAILMENTLEVELCONTCOMPARE";

export const getJPAilmentLevelContCompare = () => ({
  type: GET_JPAILMENTLEVELCONTCOMPARE
});

export const setJPAilmentLevelContCompare = (ailment_level_condition_compare_jp) => ({
  type: SET_JPAILMENTLEVELCONTCOMPARE,
  ailment_level_condition_compare_jp: ailment_level_condition_compare_jp
});

const initialState = {
  ailment_level_condition_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTLEVELCONTCOMPARE:
      const { ailment_level_condition_compare_jp } = action;
      return { ...state, ailment_level_condition_compare_jp: ailment_level_condition_compare_jp };
    default:
      return state;
  }
};
