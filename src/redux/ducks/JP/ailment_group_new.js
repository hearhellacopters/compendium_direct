export const GET_JPAILMENTGROUPNEW = "GET_JPAILMENTGROUPNEW";
const SET_JPAILMENTGROUPNEW = "SET_JPAILMENTGROUPNEW";

export const getJPAilmentGroupNew = () => ({
  type: GET_JPAILMENTGROUPNEW
});

export const setJPAilmentGroupNew = (ailment_group_new_jp) => ({
  type: SET_JPAILMENTGROUPNEW,
  ailment_group_new_jp: ailment_group_new_jp
});

const initialState = {
  ailment_group_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTGROUPNEW:
      const { ailment_group_new_jp } = action;
      return { ...state, ailment_group_new_jp: ailment_group_new_jp };
    default:
      return state;
  }
};
