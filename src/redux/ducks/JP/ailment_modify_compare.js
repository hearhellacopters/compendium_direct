export const GET_JPAILMENTMODIFYCOMPARE = "GET_JPAILMENTMODIFYCOMPARE";
const SET_JPAILMENTMODIFYCOMPARE = "SET_JPAILMENTMODIFYCOMPARE";

export const getJPAilmentModifyCompare = () => ({
  type: GET_JPAILMENTMODIFYCOMPARE
});

export const setJPAilmentModifyCompare = (ailment_modify_compare_jp) => ({
  type: SET_JPAILMENTMODIFYCOMPARE,
  ailment_modify_compare_jp: ailment_modify_compare_jp
});

const initialState = {
  ailment_modify_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTMODIFYCOMPARE:
      const { ailment_modify_compare_jp } = action;
      return { ...state, ailment_modify_compare_jp: ailment_modify_compare_jp };
    default:
      return state;
  }
};
