export const GET_GLAILMENTCASTCOMPARE = "GET_GLAILMENTCASTCOMPARE";
const SET_GLAILMENTCASTCOMPARE = "SET_GLAILMENTCASTCOMPARE";

export const getGLAilmentCastCompare = () => ({
  type: GET_GLAILMENTCASTCOMPARE
});

export const setGLAilmentCastCompare = (ailment_cast_compare_gl) => ({
  type: SET_GLAILMENTCASTCOMPARE,
  ailment_cast_compare_gl: ailment_cast_compare_gl
});

const initialState = {
  ailment_cast_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTCASTCOMPARE:
      const { ailment_cast_compare_gl } = action;
      return { ...state, ailment_cast_compare_gl: ailment_cast_compare_gl };
    default:
      return state;
  }
};
