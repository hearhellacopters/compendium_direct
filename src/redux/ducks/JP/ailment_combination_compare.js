export const GET_JPAILMENTCOMBINATIONCOMPARE = "GET_JPAILMENTCOMBINATIONCOMPARE";
const SET_JPAILMENTCOMBINATIONCOMPARE = "SET_JPAILMENTCOMBINATIONCOMPARE";

export const getJPAilmentCombinationCompare = () => ({
  type: GET_JPAILMENTCOMBINATIONCOMPARE
});

export const setJPAilmentCombinationCompare = (ailment_combination_compare_jp) => ({
  type: SET_JPAILMENTCOMBINATIONCOMPARE,
  ailment_combination_compare_jp: ailment_combination_compare_jp
});

const initialState = {
  ailment_combination_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTCOMBINATIONCOMPARE:
      const { ailment_combination_compare_jp } = action;
      return { ...state, ailment_combination_compare_jp: ailment_combination_compare_jp };
    default:
      return state;
  }
};
