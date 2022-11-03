export const GET_AILMENTNAMES = "GET_AILMENTNAMES";
const SET_AILMENTNAMES= "SET_AILMENTNAMES";

export const getAilmentNames = () => ({
  type: GET_AILMENTNAMES
});

export const setAilmentNames = (ailmentnames) => ({
  type: SET_AILMENTNAMES,
  ailmentnames: ailmentnames
});

const initialState = {
    ailmentnames: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AILMENTNAMES:
      const { ailmentnames } = action;
      return { ...state, ailmentnames: ailmentnames };
    default:
      return state;
  }
};
