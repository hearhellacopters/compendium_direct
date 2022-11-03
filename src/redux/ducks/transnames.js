export const GET_TRANSNAMES = "GET_TRANSNAMES";
const SET_TRANSNAMES = "SET_TRANSNAMES";

export const getTransNames = () => ({
  type: GET_TRANSNAMES
});

export const setTransNames = (transnames) => ({
  type: SET_TRANSNAMES,
  transnames: transnames
});

const initialState = {
  transnames: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSNAMES:
      const { transnames } = action;
      return { ...state, transnames: transnames };
    default:
      return state;
  }
};