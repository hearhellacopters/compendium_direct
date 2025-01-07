export const GET_GLAILMENTFIELDEFFECTSCOMPARE = "GET_GLAILMENTFIELDFFECTSCOMPARE";
const SET_GLAILMENTFIELDEFFECTSCOMPARE = "SET_GLAILMENTFIELDEFFECTSCOMPARE";

export const getGLAilmentFieldEffectsCompare = () => ({
  type: GET_GLAILMENTFIELDEFFECTSCOMPARE
});

export const setGLAilmentFieldEffectsCompare = (ailment_field_effects_compare_gl) => ({
  type: SET_GLAILMENTFIELDEFFECTSCOMPARE,
  ailment_field_effects_compare_gl: ailment_field_effects_compare_gl
});

const initialState = {
  ailment_field_effects_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTFIELDEFFECTSCOMPARE:
      const { ailment_field_effects_compare_gl } = action;
      return { ...state, ailment_field_effects_compare_gl: ailment_field_effects_compare_gl };
    default:
      return state;
  }
};
