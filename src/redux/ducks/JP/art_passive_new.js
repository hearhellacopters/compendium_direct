export const GET_JPARTPASSIVENEW = "GET_JPARTPASSIVENEW";
const SET_JPARTPASSIVENEW = "SET_JPARTPASSIVENEW";

export const getJPArtPassiveNew = () => ({
  type: GET_JPARTPASSIVENEW
});

export const setJPArtPassiveNew = (art_passive_new_jp) => ({
  type: SET_JPARTPASSIVENEW,
  art_passive_new_jp: art_passive_new_jp
});

const initialState = {
  art_passive_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPARTPASSIVENEW:
      const { art_passive_new_jp } = action;
      return { ...state, art_passive_new_jp: art_passive_new_jp };
    default:
      return state;
  }
};
