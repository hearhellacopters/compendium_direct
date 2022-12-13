export const GET_JPGAMELISTPASSIVE = "GET_JPGAMELISTPASSIVE";
const SET_JPGAMELISTPASSIVE = "SET_JPGAMELISTPASSIVE";

export const getJPGameListPassive = () => ({
  type: GET_JPGAMELISTPASSIVE
});

export const setJPGameListPassive = (jp_gamelist_passive) => ({
  type: SET_JPGAMELISTPASSIVE,
  jp_gamelist_passive: jp_gamelist_passive
});

const initialState = {
  jp_gamelist_passive: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPGAMELISTPASSIVE:
      const { jp_gamelist_passive } = action;
      return { ...state, jp_gamelist_passive: jp_gamelist_passive };
    default:
      return state;
  }
};
