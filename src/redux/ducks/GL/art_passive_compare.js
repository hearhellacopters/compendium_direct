export const GET_GLARTPASSIVECOMPARE = "GET_GLARTPASSIVECOMPARE";
const SET_GLARTPASSIVECOMPARE = "SET_GLARTPASSIVECOMPARE";

export const getGLArtPassiveCompare = () => ({
  type: GET_GLARTPASSIVECOMPARE
});

export const setGLArtPassiveCompare = (art_passive_compare_gl) => ({
  type: SET_GLARTPASSIVECOMPARE,
  art_passive_compare_gl: art_passive_compare_gl
});

const initialState = {
  art_passive_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLARTPASSIVECOMPARE:
      const { art_passive_compare_gl } = action;
      return { ...state, art_passive_compare_gl: art_passive_compare_gl };
    default:
      return state;
  }
};
