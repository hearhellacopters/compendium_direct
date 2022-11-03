export const GET_SUM1TABLE = "GET_SUM1TABLE";
const SET_SUM1TABLE = "SET_SUM1TABLE";

export const getSUM1Table = () => ({
  type: GET_SUM1TABLE
});

export const setSUM1Table = (tablesum1) => ({
  type: SET_SUM1TABLE,
  tablesum1: tablesum1
});

const initialState = {
  tablesum1: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUM1TABLE:
      const { tablesum1 } = action;
      return { ...state, tablesum1: tablesum1 };
    default:
      return state;
  }
};
