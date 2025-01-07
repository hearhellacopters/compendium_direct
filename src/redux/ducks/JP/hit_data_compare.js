export const GET_JPHITDATACOMPARE = "GET_JPHITDATACOMPARE";
const SET_JPHITDATACOMPARE = "SET_JPHITDATACOMPARE";

export const getJPHitDataCompare = () => ({
  type: GET_JPHITDATACOMPARE
});

export const setJPHitDataCompare = (hit_data_compare_jp) => ({
  type: SET_JPHITDATACOMPARE,
  hit_data_compare_jp: hit_data_compare_jp
});

const initialState = {
  hit_data_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPHITDATACOMPARE:
      const { hit_data_compare_jp } = action;
      return { ...state, hit_data_compare_jp: hit_data_compare_jp };
    default:
      return state;
  }
};
