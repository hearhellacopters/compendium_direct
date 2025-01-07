export const GET_JPAILMENTGROUPCOMPARE = "GET_JPAILMENTGROUPCOMPARE";
const SET_JPAILMENTGROUPCOMPARE = "SET_JPAILMENTGROUPCOMPARE";

export const getJPAilmentGroupCompare = () => ({
  type: GET_JPAILMENTGROUPCOMPARE
});

export const setJPAilmentGroupCompare = (ailment_group_compare_jp) => ({
  type: SET_JPAILMENTGROUPCOMPARE,
  ailment_group_compare_jp: ailment_group_compare_jp
});

const initialState = {
  ailment_group_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTGROUPCOMPARE:
      const { ailment_group_compare_jp } = action;
      return { ...state, ailment_group_compare_jp: ailment_group_compare_jp };
    default:
      return state;
  }
};
