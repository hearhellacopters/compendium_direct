export const GET_JPSUMFIXPASSIVENEW = "GET_JPSUMFIXPASSIVENEW";
const SET_JPSUMFIXPASSIVENEW = "SET_JPSUMFIXPASSIVENEW";

export const getJPSumFixPassiveNew = () => ({
  type: GET_JPSUMFIXPASSIVENEW
});

export const setJPSumFixPassiveNew = (sum_fix_passive_new_jp) => ({
  type: SET_JPSUMFIXPASSIVENEW,
  sum_fix_passive_new_jp: sum_fix_passive_new_jp
});

const initialState = {
  sum_fix_passive_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPSUMFIXPASSIVENEW:
      const { sum_fix_passive_new_jp } = action;
      return { ...state, sum_fix_passive_new_jp: sum_fix_passive_new_jp };
    default:
      return state;
  }
};
