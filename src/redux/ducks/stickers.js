export const GET_STICKERS = "GET_STICKERS";
const SET_STICKERS = "SET_STICKERS";

export const getStickers = () => ({
  type: GET_STICKERS
});

export const setStickers = (stickers) => ({
  type: SET_STICKERS,
  stickers: stickers
});

const initialState = {
  stickers: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STICKERS:
      const { stickers } = action;
      return { ...state, stickers: stickers };
    default:
      return state;
  }
};
