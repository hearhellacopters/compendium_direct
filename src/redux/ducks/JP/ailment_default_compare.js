export const GET_JPAILMENTDEFAULTCOMPARE = "GET_JPAILMENTDEFAULTCOMPARE";
const SET_JPAILMENTDEFAULTCOMPARE = "SET_JPAILMENTDEFAULTCOMPARE";

export const getJPAilmentDefaultCompare = () => ({
  type: GET_JPAILMENTDEFAULTCOMPARE
});

export const setJPAilmentDefaultCompare = (ailment_default_compare_jp) => ({
  type: SET_JPAILMENTDEFAULTCOMPARE,
  ailment_default_compare_jp: ailment_default_compare_jp
});

const initialState = {
  ailment_default_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTDEFAULTCOMPARE:
      const { ailment_default_compare_jp } = action;
      return { ...state, ailment_default_compare_jp: ailment_default_compare_jp };
    default:
      return state;
  }
};
