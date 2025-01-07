export const GET_JPAILMENTCASTCOMPARE = "GET_JPAILMENTCASTCOMPARE";
const SET_JPAILMENTCASTCOMPARE = "SET_JPAILMENTCASTCOMPARE";

export const getJPAilmentCastCompare = () => ({
  type: GET_JPAILMENTCASTCOMPARE
});

export const setJPAilmentCastCompare = (ailment_cast_compare_jp) => ({
  type: SET_JPAILMENTCASTCOMPARE,
  ailment_cast_compare_jp: ailment_cast_compare_jp
});

const initialState = {
  ailment_cast_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTCASTCOMPARE:
      const { ailment_cast_compare_jp } = action;
      return { ...state, ailment_cast_compare_jp: ailment_cast_compare_jp };
    default:
      return state;
  }
};
