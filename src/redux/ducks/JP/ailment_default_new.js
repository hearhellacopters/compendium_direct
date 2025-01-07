export const GET_JPAILMENTDEFAULTNEW = "GET_JPAILMENTDEFAULTNEW";
const SET_JPAILMENTDEFAULTNEW = "SET_JPAILMENTDEFAULTNEW";

export const getJPAilmentDefaultNew = () => ({
  type: GET_JPAILMENTDEFAULTNEW
});

export const setJPAilmentDefaultNew = (ailment_default_new_jp) => ({
  type: SET_JPAILMENTDEFAULTNEW,
  ailment_default_new_jp: ailment_default_new_jp
});

const initialState = {
  ailment_default_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTDEFAULTNEW:
      const { ailment_default_new_jp } = action;
      return { ...state, ailment_default_new_jp: ailment_default_new_jp };
    default:
      return state;
  }
};
