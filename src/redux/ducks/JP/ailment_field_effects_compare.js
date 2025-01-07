export const GET_JPAILMENTFIELDEFFECTSCOMPARE = "GET_JPAILMENTFIELDFFECTSCOMPARE";
const SET_JPAILMENTFIELDEFFECTSCOMPARE = "SET_JPAILMENTFIELDEFFECTSCOMPARE";

export const getJPAilmentFieldEffectsCompare = () => ({
  type: GET_JPAILMENTFIELDEFFECTSCOMPARE
});

export const setJPAilmentFieldEffectsCompare = (ailment_field_effects_compare_jp) => ({
  type: SET_JPAILMENTFIELDEFFECTSCOMPARE,
  ailment_field_effects_compare_jp: ailment_field_effects_compare_jp
});

const initialState = {
  ailment_field_effects_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTFIELDEFFECTSCOMPARE:
      const { ailment_field_effects_compare_jp } = action;
      return { ...state, ailment_field_effects_compare_jp: ailment_field_effects_compare_jp };
    default:
      return state;
  }
};
