export const GET_JPCONDDATACOMPARE = "GET_JPCONDDATACOMPARE";
const SET_JPCONDDATACOMPARE = "SET_JPCONDDATACOMPARE";

export const getJPCondDataCompare = () => ({
  type: GET_JPCONDDATACOMPARE
});

export const setJPCondDataCompare = (cond_data_compare_jp) => ({
  type: SET_JPCONDDATACOMPARE,
  cond_data_compare_jp: cond_data_compare_jp
});

const initialState = {
  cond_data_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPCONDDATACOMPARE:
      const { cond_data_compare_jp } = action;
      return { ...state, cond_data_compare_jp: cond_data_compare_jp };
    default:
      return state;
  }
};
