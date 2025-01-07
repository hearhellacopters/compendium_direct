export const GET_JPAILMENTRANKCOMPARE = "GET_JPAILMENTRANKCOMPARE";
const SET_JPAILMENTRANKCOMPARE = "SET_JPAILMENTRANKCOMPARE";

export const getJPAilmentRankCompare = () => ({
  type: GET_JPAILMENTRANKCOMPARE
});

export const setJPAilmentRankCompare = (ailment_rank_compare_jp) => ({
  type: SET_JPAILMENTRANKCOMPARE,
  ailment_rank_compare_jp: ailment_rank_compare_jp
});

const initialState = {
  ailment_rank_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTRANKCOMPARE:
      const { ailment_rank_compare_jp } = action;
      return { ...state, ailment_rank_compare_jp: ailment_rank_compare_jp };
    default:
      return state;
  }
};
