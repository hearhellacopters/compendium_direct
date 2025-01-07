export const GET_JPAILMENTDATACOMPARE = "GET_JPAILMENTDATACOMPARE";
const SET_JPAILMENTDATACOMPARE = "SET_JPAILMENTDATACOMPARE";

export const getJPAilmentDataCompare = () => ({
  type: GET_JPAILMENTDATACOMPARE
});

export const setJPAilmentDataCompare = (ailment_data_compare_jp) => ({
  type: SET_JPAILMENTDATACOMPARE,
  ailment_data_compare_jp: ailment_data_compare_jp
});

const initialState = {
  ailment_data_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTDATACOMPARE:
      const { ailment_data_compare_jp } = action;
      return { ...state, ailment_data_compare_jp: ailment_data_compare_jp };
    default:
      return state;
  }
};
