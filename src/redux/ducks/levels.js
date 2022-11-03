export const GET_LEVELS = "GET_LEVELS";
const SET_LEVELS = "SET_LEVELS";

export const getLevels = () => ({
  type: GET_LEVELS
});

export const setLevels = (levels) => ({
  type: SET_LEVELS,
  levels: levels
});

const initialState = {
  levels: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LEVELS:
      const { levels } = action;
      return { ...state, levels: levels };
    default:
      return state;
  }
};
