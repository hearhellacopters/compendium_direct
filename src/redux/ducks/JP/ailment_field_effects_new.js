export const GET_JPAILMENTFIELDEFFECTSNEW = "GET_JPAILMENTFIELDEFFECTSNEW";
const SET_JPAILMENTFIELDEFFECTSNEW = "SET_JPAILMENTFIELDEFFECTSNEW";

export const getJPAilmentFieldEffectsNew = () => ({
  type: GET_JPAILMENTFIELDEFFECTSNEW
});

export const setJPAilmentFieldEffectsNew = (ailment_field_effects_new_jp) => ({
  type: SET_JPAILMENTFIELDEFFECTSNEW,
  ailment_field_effects_new_jp: ailment_field_effects_new_jp
});

const initialState = {
  ailment_field_effects_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTFIELDEFFECTSNEW:
      const { ailment_field_effects_new_jp } = action;
      return { ...state, ailment_field_effects_new_jp: ailment_field_effects_new_jp };
    default:
      return state;
  }
};
