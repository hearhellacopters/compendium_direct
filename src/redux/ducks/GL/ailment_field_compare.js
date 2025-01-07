export const GET_GLAILMENTFIELDCOMPARE = "GET_GLAILMENTFIELDCOMPARE";
const SET_GLAILMENTFIELDCOMPARE = "SET_GLAILMENTFIELDCOMPARE";

export const getGLAilmentFieldCompare = () => ({
  type: GET_GLAILMENTFIELDCOMPARE
});

export const setGLAilmentFieldCompare = (ailment_field_compare_gl) => ({
  type: SET_GLAILMENTFIELDCOMPARE,
  ailment_field_compare_gl: ailment_field_compare_gl
});

const initialState = {
  ailment_field_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTFIELDCOMPARE:
      const { ailment_field_compare_gl } = action;
      return { ...state, ailment_field_compare_gl: ailment_field_compare_gl };
    default:
      return state;
  }
};
