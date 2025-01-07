export const GET_GLAILMENTRANKCOMPARE = "GET_GLAILMENTRANKCOMPARE";
const SET_GLAILMENTRANKCOMPARE = "SET_GLAILMENTRANKCOMPARE";

export const getGLAilmentRankCompare = () => ({
  type: GET_GLAILMENTRANKCOMPARE
});

export const setGLAilmentRankCompare = (ailment_rank_compare_gl) => ({
  type: SET_GLAILMENTRANKCOMPARE,
  ailment_rank_compare_gl: ailment_rank_compare_gl
});

const initialState = {
  ailment_rank_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTRANKCOMPARE:
      const { ailment_rank_compare_gl } = action;
      return { ...state, ailment_rank_compare_gl: ailment_rank_compare_gl };
    default:
      return state;
  }
};
