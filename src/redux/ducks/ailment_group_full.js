export const GET_AILMENTGROUPFULL = "GET_AILMENTGROUPFULL";
const SET_AILMENTGROUPFULL = "SET_AILMENTGROUPFULL";

export const getAilmentGroupFull = () => ({
  type: GET_AILMENTGROUPFULL
});

export const setAilmentGroupFull = (ailment_group_full) => ({
  type: SET_AILMENTGROUPFULL,
  ailment_group_full: ailment_group_full
});

const initialState = {
  ailment_group_full: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AILMENTGROUPFULL:
      const { ailment_group_full } = action;
      return { ...state, ailment_group_full: ailment_group_full };
    default:
      return state;
  }
};
