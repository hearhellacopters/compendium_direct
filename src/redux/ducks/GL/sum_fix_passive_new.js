export const GET_GLSUMFIXPASSIVENEW = "GET_GLSUMFIXPASSIVENEW";
const SET_GLSUMFIXPASSIVENEW = "SET_GLSUMFIXPASSIVENEW";

export const getGLSumFixPassiveNew = () => ({
  type: GET_GLSUMFIXPASSIVENEW
});

export const setGLSumFixPassiveNew = (sum_fix_passive_new_gl) => ({
  type: SET_GLSUMFIXPASSIVENEW,
  sum_fix_passive_new_gl: sum_fix_passive_new_gl
});

const initialState = {
  sum_fix_passive_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLSUMFIXPASSIVENEW:
      const { sum_fix_passive_new_gl } = action;
      return { ...state, sum_fix_passive_new_gl: sum_fix_passive_new_gl };
    default:
      return state;
  }
};
