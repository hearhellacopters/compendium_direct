export const GET_SUMMONS = "GET_SUMMONS";
const SET_SUMMONS = "SET_SUMMONS";

export const getSummons = () => ({
  type: GET_SUMMONS
});

export const setSummons = (summons) => ({
  type: SET_SUMMONS,
  summons: summons
});

const initialState = {
  summons: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUMMONS:
      const { summons } = action;
      return { ...state, summons: summons };
    default:
      return state;
  }
};
