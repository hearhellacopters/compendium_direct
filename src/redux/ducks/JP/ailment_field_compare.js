export const GET_JPAILMENTFIELDCOMPARE = "GET_JPAILMENTFIELDCOMPARE";
const SET_JPAILMENTFIELDCOMPARE = "SET_JPAILMENTFIELDCOMPARE";

export const getJPAilmentFieldCompare = () => ({
  type: GET_JPAILMENTFIELDCOMPARE
});

export const setJPAilmentFieldCompare = (ailment_field_compare_jp) => ({
  type: SET_JPAILMENTFIELDCOMPARE,
  ailment_field_compare_jp: ailment_field_compare_jp
});

const initialState = {
  ailment_field_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTFIELDCOMPARE:
      const { ailment_field_compare_jp } = action;
      return { ...state, ailment_field_compare_jp: ailment_field_compare_jp };
    default:
      return state;
  }
};
