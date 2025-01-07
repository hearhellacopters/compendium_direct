export const GET_GLAILMENTDEFAULTCOMPARE = "GET_GLAILMENTDEFAULTCOMPARE";
const SET_GLAILMENTDEFAULTCOMPARE = "SET_GLAILMENTDEFAULTCOMPARE";

export const getGLAilmentDefaultCompare = () => ({
  type: GET_GLAILMENTDEFAULTCOMPARE
});

export const setGLAilmentDefaultCompare = (ailment_default_compare_gl) => ({
  type: SET_GLAILMENTDEFAULTCOMPARE,
  ailment_default_compare_gl: ailment_default_compare_gl
});

const initialState = {
  ailment_default_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTDEFAULTCOMPARE:
      const { ailment_default_compare_gl } = action;
      return { ...state, ailment_default_compare_gl: ailment_default_compare_gl };
    default:
      return state;
  }
};
