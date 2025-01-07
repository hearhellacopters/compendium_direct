export const GET_GLAILMENTCOMBINATIONCOMPARE = "GET_GLAILMENTCOMBINATIONCOMPARE";
const SET_GLAILMENTCOMBINATIONCOMPARE = "SET_GLAILMENTCOMBINATIONCOMPARE";

export const getGLAilmentCombinationCompare = () => ({
  type: GET_GLAILMENTCOMBINATIONCOMPARE
});

export const setGLAilmentCombinationCompare = (ailment_combination_compare_gl) => ({
  type: SET_GLAILMENTCOMBINATIONCOMPARE,
  ailment_combination_compare_gl: ailment_combination_compare_gl
});

const initialState = {
  ailment_combination_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTCOMBINATIONCOMPARE:
      const { ailment_combination_compare_gl } = action;
      return { ...state, ailment_combination_compare_gl: ailment_combination_compare_gl };
    default:
      return state;
  }
};
