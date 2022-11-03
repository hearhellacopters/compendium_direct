export const GET_SUMMONLEVELS = "GET_SUMMONLEVELS";
const SET_SUMMONLEVELS = "SET_SUMMONLEVELS";

export const getSummonLevels = () => ({
  type: GET_SUMMONLEVELS
});

export const setSummonLevels = (summonlevels) => ({
  type: SET_SUMMONLEVELS,
  summonlevels: summonlevels
});

const initialState = {
  summonlevels: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUMMONLEVELS:
      const { summonlevels } = action;
      return { ...state, summonlevels: summonlevels };
    default:
      return state;
  }
};
