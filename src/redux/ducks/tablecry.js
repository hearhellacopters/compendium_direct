export const GET_CRYTABLE = "GET_CRYTABLE";
const SET_CRYTABLE = "SET_CRYTABLE";

export const getCRYTable = () => ({
  type: GET_CRYTABLE
});

export const setCRYTable = (tablecry) => ({
  type: SET_CRYTABLE,
  tablecry: tablecry
});

const initialState = {
  tablecry: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CRYTABLE:
      const { tablecry } = action;
      return { ...state, tablecry: tablecry };
    default:
      return state;
  }
};
