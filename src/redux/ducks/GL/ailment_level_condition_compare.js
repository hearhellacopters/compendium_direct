export const GET_GLAILMENTLEVELCONTCOMPARE = "GET_GLAILMENTLEVELCONTCOMPARE";
const SET_GLAILMENTLEVELCONTCOMPARE = "SET_GLAILMENTLEVELCONTCOMPARE";

export const getGLAilmentLevelContCompare = () => ({
  type: GET_GLAILMENTLEVELCONTCOMPARE
});

export const setGLAilmentLevelContCompare = (ailment_level_condition_compare_gl) => ({
  type: SET_GLAILMENTLEVELCONTCOMPARE,
  ailment_level_condition_compare_gl: ailment_level_condition_compare_gl
});

const initialState = {
  ailment_level_condition_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTLEVELCONTCOMPARE:
      const { ailment_level_condition_compare_gl } = action;
      return { ...state, ailment_level_condition_compare_gl: ailment_level_condition_compare_gl };
    default:
      return state;
  }
};
