export const GET_SUM2TABLE = "GET_SUM2TABLE";
const SET_SUM2TABLE = "SET_SUM2TABLE";

export const getSUM2Table = () => ({
  type: GET_SUM2TABLE
});

export const setSUM2Table = (tablesum2) => ({
  type: SET_SUM2TABLE,
  tablesum2: tablesum2
});

const initialState = {
  tablesum2: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUM2TABLE:
      const { tablesum2 } = action;
      return { ...state, tablesum2: tablesum2 };
    default:
      return state;
  }
};
