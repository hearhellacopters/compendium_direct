export const GET_JPSUMFIXPASSIVECOMPARE = "GET_JPSUMFIXPASSIVECOMPARE";
const SET_JPSUMFIXPASSIVECOMPARE = "SET_JPSUMFIXPASSIVECOMPARE";

export const getJPSumFixPassiveCompare = () => ({
  type: GET_JPSUMFIXPASSIVECOMPARE
});

export const setJPSumFixPassiveCompare = (sum_fix_passive_compare_jp) => ({
  type: SET_JPSUMFIXPASSIVECOMPARE,
  sum_fix_passive_compare_jp: sum_fix_passive_compare_jp
});

const initialState = {
  sum_fix_passive_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPSUMFIXPASSIVECOMPARE:
      const { sum_fix_passive_compare_jp } = action;
      return { ...state, sum_fix_passive_compare_jp: sum_fix_passive_compare_jp };
    default:
      return state;
  }
};
