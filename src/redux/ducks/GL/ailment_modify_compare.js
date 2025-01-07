export const GET_GLAILMENTMODIFYCOMPARE = "GET_GLAILMENTMODIFYCOMPARE";
const SET_GLAILMENTMODIFYCOMPARE = "SET_GLAILMENTMODIFYCOMPARE";

export const getGLAilmentModifyCompare = () => ({
  type: GET_GLAILMENTMODIFYCOMPARE
});

export const setGLAilmentModifyCompare = (ailment_modify_compare_gl) => ({
  type: SET_GLAILMENTMODIFYCOMPARE,
  ailment_modify_compare_gl: ailment_modify_compare_gl
});

const initialState = {
  ailment_modify_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTMODIFYCOMPARE:
      const { ailment_modify_compare_gl } = action;
      return { ...state, ailment_modify_compare_gl: ailment_modify_compare_gl };
    default:
      return state;
  }
};
