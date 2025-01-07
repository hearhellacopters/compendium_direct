export const GET_GLSUMFIXPASSIVECOMPARE = "GET_GLSUMFIXPASSIVECOMPARE";
const SET_GLSUMFIXPASSIVECOMPARE = "SET_GLSUMFIXPASSIVECOMPARE";

export const getGLSumFixPassiveCompare = () => ({
  type: GET_GLSUMFIXPASSIVECOMPARE
});

export const setGLSumFixPassiveCompare = (sum_fix_passive_compare_gl) => ({
  type: SET_GLSUMFIXPASSIVECOMPARE,
  sum_fix_passive_compare_gl: sum_fix_passive_compare_gl
});

const initialState = {
  sum_fix_passive_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLSUMFIXPASSIVECOMPARE:
      const { sum_fix_passive_compare_gl } = action;
      return { ...state, sum_fix_passive_compare_gl: sum_fix_passive_compare_gl };
    default:
      return state;
  }
};
