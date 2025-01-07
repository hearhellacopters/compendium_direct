export const GET_JPAILMENTCASTNEW = "GET_JPAILMENTCASTNEW";
const SET_JPAILMENTCASTNEW = "SET_JPAILMENTCASTNEW";

export const getJPAilmentCastNew = () => ({
  type: GET_JPAILMENTCASTNEW
});

export const setJPAilmentCastNew = (ailment_cast_new_jp) => ({
  type: SET_JPAILMENTCASTNEW,
  ailment_cast_new_jp: ailment_cast_new_jp
});

const initialState = {
  ailment_cast_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTCASTNEW:
      const { ailment_cast_new_jp } = action;
      return { ...state, ailment_cast_new_jp: ailment_cast_new_jp };
    default:
      return state;
  }
};
