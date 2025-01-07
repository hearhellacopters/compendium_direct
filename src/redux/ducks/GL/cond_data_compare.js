export const GET_GLCONDDATACOMPARE = "GET_GLCONDDATACOMPARE";
const SET_GLCONDDATACOMPARE = "SET_GLCONDDATACOMPARE";

export const getGLCondDataCompare = () => ({
  type: GET_GLCONDDATACOMPARE
});

export const setGLCondDataCompare = (cond_data_compare_gl) => ({
  type: SET_GLCONDDATACOMPARE,
  cond_data_compare_gl: cond_data_compare_gl
});

const initialState = {
  cond_data_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLCONDDATACOMPARE:
      const { cond_data_compare_gl } = action;
      return { ...state, cond_data_compare_gl: cond_data_compare_gl };
    default:
      return state;
  }
};
