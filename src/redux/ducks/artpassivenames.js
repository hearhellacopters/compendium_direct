export const GET_ARTPASSIVENAMES = "GET_ARTPASSIVENAMES";
const SET_ARTPASSIVENAMES = "SET_ARTPASSIVENAMES";

export const getArtPassiveNames = () => ({
  type: GET_ARTPASSIVENAMES
});

export const setArtPassiveNames = (artpassivenames) => ({
  type: SET_ARTPASSIVENAMES,
  artpassivenames: artpassivenames
});

const initialState = {
    artpassivenames: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTPASSIVENAMES:
      const { artpassivenames } = action;
      return { ...state, artpassivenames: artpassivenames };
    default:
      return state;
  }
};