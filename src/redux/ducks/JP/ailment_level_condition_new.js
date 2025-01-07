export const GET_JPAILMENTLEVELCONTNEW = "GET_JPAILMENTLEVELCONTNEW";
const SET_JPAILMENTLEVELCONTNEW = "SET_JPAILMENTLEVELCONTNEW";

export const getJPAilmentLevelContNew = () => ({
  type: GET_JPAILMENTLEVELCONTNEW
});

export const setJPAilmentLevelContNew = (ailment_level_condition_new_jp) => ({
  type: SET_JPAILMENTLEVELCONTNEW,
  ailment_level_condition_new_jp: ailment_level_condition_new_jp
});

const initialState = {
  ailment_level_condition_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTLEVELCONTNEW:
      const { ailment_level_condition_new_jp } = action;
      return { ...state, ailment_level_condition_new_jp: ailment_level_condition_new_jp };
    default:
      return state;
  }
};
