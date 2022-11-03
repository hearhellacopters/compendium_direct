export const GET_SUMMONPASSIVES = "GET_SUMMONPASSIVES";
const SET_SUMMONPASSIVES = "SET_SUMMONPASSIVES";

export const getSummonPassives = () => ({
  type: GET_SUMMONPASSIVES
});

export const setSummonPassives = (summonpassives) => ({
  type: SET_SUMMONPASSIVES,
  summonpassives: summonpassives
});

const initialState = {
  summonlevels: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUMMONPASSIVES:
      const { summonpassives } = action;
      return { ...state, summonpassives: summonpassives };
    default:
      return state;
  }
};
