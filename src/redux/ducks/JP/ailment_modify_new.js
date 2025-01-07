export const GET_JPAILMENTMODIFYNEW = "GET_JPAILMENTMODIFYNEW";
const SET_JPAILMENTMODIFYNEW = "SET_JPAILMENTMODIFYNEW";

export const getJPAilmentModifyNew = () => ({
  type: GET_JPAILMENTMODIFYNEW
});

export const setJPAilmentModifyNew = (ailment_modify_new_jp) => ({
  type: SET_JPAILMENTMODIFYNEW,
  ailment_modify_new_jp: ailment_modify_new_jp
});

const initialState = {
  ailment_modify_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTMODIFYNEW:
      const { ailment_modify_new_jp } = action;
      return { ...state, ailment_modify_new_jp: ailment_modify_new_jp };
    default:
      return state;
  }
};
