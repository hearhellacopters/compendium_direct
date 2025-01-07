export const GET_GLAILMENTFIELDEFFECTSNEW = "GET_GLAILMENTFIELDEFFECTSNEW";
const SET_GLAILMENTFIELDEFFECTSNEW = "SET_GLAILMENTFIELDEFFECTSNEW";

export const getGLAilmentFieldEffectsNew = () => ({
  type: GET_GLAILMENTFIELDEFFECTSNEW
});

export const setGLAilmentFieldEffectsNew = (ailment_field_effects_new_gl) => ({
  type: SET_GLAILMENTFIELDEFFECTSNEW,
  ailment_field_effects_new_gl: ailment_field_effects_new_gl
});

const initialState = {
  ailment_field_effects_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTFIELDEFFECTSNEW:
      const { ailment_field_effects_new_gl } = action;
      return { ...state, ailment_field_effects_new_gl: ailment_field_effects_new_gl };
    default:
      return state;
  }
};
