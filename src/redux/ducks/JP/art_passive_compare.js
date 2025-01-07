export const GET_JPARTPASSIVECOMPARE = "GET_JPARTPASSIVECOMPARE";
const SET_JPARTPASSIVECOMPARE = "SET_JPARTPASSIVECOMPARE";

export const getJPArtPassiveCompare = () => ({
  type: GET_JPARTPASSIVECOMPARE
});

export const setJPArtPassiveCompare = (art_passive_compare_jp) => ({
  type: SET_JPARTPASSIVECOMPARE,
  art_passive_compare_jp: art_passive_compare_jp
});

const initialState = {
  art_passive_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPARTPASSIVECOMPARE:
      const { art_passive_compare_jp } = action;
      return { ...state, art_passive_compare_jp: art_passive_compare_jp };
    default:
      return state;
  }
};
